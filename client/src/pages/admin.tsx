import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Plus, FileText, Database } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface QuestionFormData {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: number;
  category: string;
}

export default function Admin() {
  const [csvData, setCsvData] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<QuestionFormData>({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: 0,
    category: 'innovatsion_iqtisodiyot'
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get total questions count
  const { data: stats } = useQuery({
    queryKey: ['/api/quiz/stats'],
    queryFn: ({ queryKey }) => fetch(queryKey[0]).then(res => res.json())
  });

  // Add single question mutation
  const addQuestionMutation = useMutation({
    mutationFn: (data: QuestionFormData) => 
      apiRequest('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: data.question,
          options: [data.option1, data.option2, data.option3, data.option4],
          correctAnswer: data.correctAnswer,
          category: data.category
        })
      }),
    onSuccess: () => {
      toast({ title: 'Savol muvaffaqiyatli qo\'shildi!' });
      setFormData({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: 0,
        category: 'innovatsion_iqtisodiyot'
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
    },
    onError: (error) => {
      toast({ 
        title: 'Xatolik yuz berdi', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  // Import CSV mutation
  const importCsvMutation = useMutation({
    mutationFn: (csvContent: string) => 
      apiRequest('/api/admin/import-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvData: csvContent })
      }),
    onSuccess: (data) => {
      toast({ 
        title: 'CSV muvaffaqiyatli import qilindi!', 
        description: `${data.imported} ta savol qo'shildi` 
      });
      setCsvData('');
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
    },
    onError: (error) => {
      toast({ 
        title: 'Import xatoligi', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  // Populate from parser mutation
  const populateFromParserMutation = useMutation({
    mutationFn: () => apiRequest('/api/admin/populate-questions', { method: 'POST' }),
    onSuccess: (data) => {
      toast({ 
        title: 'Savollar muvaffaqiyatli yuklandi!', 
        description: `${data.imported} ta savol qo'shildi` 
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
    },
    onError: (error) => {
      toast({ 
        title: 'Yuklash xatoligi', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.option1.trim()) {
      toast({ 
        title: 'Xatolik', 
        description: 'Savol va kamida birinchi variant kiritilishi shart',
        variant: 'destructive' 
      });
      return;
    }
    addQuestionMutation.mutate(formData);
  };

  const handleCsvImport = () => {
    if (!csvData.trim()) {
      toast({ 
        title: 'Xatolik', 
        description: 'CSV ma\'lumotlari kiritilishi shart',
        variant: 'destructive' 
      });
      return;
    }
    importCsvMutation.mutate(csvData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCsvData(content);
        setIsUploading(false);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Savollarni boshqarish va import qilish</p>
        </div>

        {/* Stats Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Statistika
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {stats?.totalQuestions || 0}
                </div>
                <div className="text-sm text-gray-600">Jami savollar</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">50</div>
                <div className="text-sm text-gray-600">Quiz uchun tanlanadi</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(((stats?.totalQuestions || 0) / 600) * 100)}%
                </div>
                <div className="text-sm text-gray-600">600 tadan</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="import" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="import">CSV Import</TabsTrigger>
            <TabsTrigger value="manual">Manual qo'shish</TabsTrigger>
            <TabsTrigger value="populate">Parser dan yuklash</TabsTrigger>
          </TabsList>

          {/* CSV Import Tab */}
          <TabsContent value="import">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  CSV Import
                </CardTitle>
                <CardDescription>
                  CSV formatida savollarni import qiling. Format: savol,variant1,variant2,variant3,variant4,to'g'ri_javob_raqami,kategoriya
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="csv-file">CSV fayl yuklash</Label>
                  <Input
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="csv-data">Yoki CSV ma'lumotlarni to'g'ridan-to'g'ri kiriting</Label>
                  <Textarea
                    id="csv-data"
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                    placeholder="Innovatsiya nima?,Yangilik kiritish,Eski usulni takrorlash,Faqat tadqiqot,Pul tejash,0,innovatsion_iqtisodiyot"
                    className="mt-1 h-32"
                  />
                </div>

                <Button 
                  onClick={handleCsvImport}
                  disabled={importCsvMutation.isPending || isUploading}
                  className="w-full"
                >
                  {importCsvMutation.isPending ? 'Import qilinmoqda...' : 'CSV Import qilish'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manual Add Tab */}
          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Savol qo'shish
                </CardTitle>
                <CardDescription>
                  Yangi savolni qo'lda kiriting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="question">Savol</Label>
                    <Textarea
                      id="question"
                      value={formData.question}
                      onChange={(e) => setFormData({...formData, question: e.target.value})}
                      placeholder="Savolni kiriting..."
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="option1">1-variant (To'g'ri javob)</Label>
                      <Input
                        id="option1"
                        value={formData.option1}
                        onChange={(e) => setFormData({...formData, option1: e.target.value})}
                        placeholder="To'g'ri javob..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="option2">2-variant</Label>
                      <Input
                        id="option2"
                        value={formData.option2}
                        onChange={(e) => setFormData({...formData, option2: e.target.value})}
                        placeholder="Noto'g'ri javob..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="option3">3-variant</Label>
                      <Input
                        id="option3"
                        value={formData.option3}
                        onChange={(e) => setFormData({...formData, option3: e.target.value})}
                        placeholder="Noto'g'ri javob..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="option4">4-variant</Label>
                      <Input
                        id="option4"
                        value={formData.option4}
                        onChange={(e) => setFormData({...formData, option4: e.target.value})}
                        placeholder="Noto'g'ri javob..."
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Kategoriya</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="innovatsion_iqtisodiyot"
                      className="mt-1"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={addQuestionMutation.isPending}
                    className="w-full"
                  >
                    {addQuestionMutation.isPending ? 'Qo\'shilmoqda...' : 'Savol qo\'shish'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Populate from Parser Tab */}
          <TabsContent value="populate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Parser dan yuklash
                </CardTitle>
                <CardDescription>
                  Ichki parser dan barcha savollarni database'ga yuklash
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    Bu operatsiya barcha parser'dagi savollarni database'ga yuklaydi.
                    Takrorlangan savollar o'tkazib yuboriladi.
                  </p>
                  <Button 
                    onClick={() => populateFromParserMutation.mutate()}
                    disabled={populateFromParserMutation.isPending}
                    size="lg"
                  >
                    {populateFromParserMutation.isPending ? 'Yuklanmoqda...' : 'Barcha savollarni yuklash'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}