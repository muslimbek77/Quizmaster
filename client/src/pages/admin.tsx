import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Upload, Plus, FileText, Database, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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
  const questionsPerPage = 10;

  // Get total questions count
  const { data: stats } = useQuery({
    queryKey: ['/api/quiz/stats'],
    queryFn: ({ queryKey }) => fetch(queryKey[0]).then(res => res.json())
  });

  // Get paginated questions
  const { data: questionsData, isLoading } = useQuery({
    queryKey: ['/api/admin/questions', currentPage],
    queryFn: ({ queryKey }) => 
      fetch(`${queryKey[0]}?page=${queryKey[1]}&limit=${questionsPerPage}`)
        .then(res => res.json())
  });

  const questions = questionsData?.questions || [];
  const totalQuestions = questionsData?.total || 0;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  // Add single question mutation
  const addQuestionMutation = useMutation({
    mutationFn: (data: QuestionFormData) => 
      apiRequest('/api/admin/questions', {
        method: 'POST',
        body: JSON.stringify({
          question: data.question,
          options: [data.option1, data.option2, data.option3, data.option4],
          correctAnswer: data.correctAnswer,
          category: data.category
        })
      }),
    onSuccess: () => {
      toast({ title: 'Savol muvaffaqiyatli qo\'shildi!' });
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/questions'] });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Xatolik yuz berdi', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  // Update question mutation
  const updateQuestionMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: QuestionFormData }) => 
      apiRequest(`/api/admin/questions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          question: data.question,
          options: [data.option1, data.option2, data.option3, data.option4],
          correctAnswer: data.correctAnswer,
          category: data.category
        })
      }),
    onSuccess: () => {
      toast({ title: 'Savol muvaffaqiyatli yangilandi!' });
      setIsEditDialogOpen(false);
      setEditingQuestion(null);
      queryClient.invalidateQueries({ queryKey: ['/api/admin/questions'] });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Yangilash xatoligi', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  // Delete question mutation
  const deleteQuestionMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/admin/questions/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      toast({ title: 'Savol muvaffaqiyatli o\'chirildi!' });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/questions'] });
    },
    onError: (error: any) => {
      toast({ 
        title: 'O\'chirish xatoligi', 
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
        body: JSON.stringify({ csvData: csvContent })
      }),
    onSuccess: (data: any) => {
      toast({ 
        title: 'CSV muvaffaqiyatli import qilindi!', 
        description: `${data.imported} ta savol qo'shildi` 
      });
      setCsvData('');
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/questions'] });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Import xatoligi', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  // Populate from parser mutation
  const populateFromParserMutation = useMutation({
    mutationFn: () => 
      apiRequest('/api/admin/populate-questions', { method: 'POST' }),
    onSuccess: (data: any) => {
      toast({ 
        title: 'Savollar muvaffaqiyatli yuklandi!', 
        description: `${data.imported} ta savol qo'shildi` 
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/questions'] });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Yuklash xatoligi', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  const resetForm = () => {
    setFormData({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: 0,
      category: 'innovatsion_iqtisodiyot'
    });
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      option1: question.options[0] || '',
      option2: question.options[1] || '',
      option3: question.options[2] || '',
      option4: question.options[3] || '',
      correctAnswer: question.correctAnswer,
      category: question.category
    });
    setIsEditDialogOpen(true);
  };

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

    if (editingQuestion) {
      updateQuestionMutation.mutate({ id: editingQuestion.id, data: formData });
    } else {
      addQuestionMutation.mutate(formData);
    }
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

  const getCorrectAnswerLetter = (index: number) => {
    return ['A', 'B', 'C', 'D'][index] || 'A';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {totalPages}
                </div>
                <div className="text-sm text-gray-600">Sahifalar</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="manage">Savollarni boshqarish</TabsTrigger>
            <TabsTrigger value="import">CSV Import</TabsTrigger>
            <TabsTrigger value="manual">Manual qo'shish</TabsTrigger>
            <TabsTrigger value="populate">Parser dan yuklash</TabsTrigger>
          </TabsList>

          {/* Manage Questions Tab */}
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  Savollarni boshqarish
                </CardTitle>
                <CardDescription>
                  Mavjud savollarni ko'rish, tahrirlash va o'chirish
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Yuklanmoqda...</div>
                ) : questions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Savollar topilmadi</div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question: Question, index: number) => (
                      <div key={question.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">#{question.id}</Badge>
                              <Badge variant="secondary">{question.category}</Badge>
                              <Badge variant="default">
                                To'g'ri javob: {getCorrectAnswerLetter(question.correctAnswer)}
                              </Badge>
                            </div>
                            <h3 className="font-medium text-gray-900 mb-3">
                              {question.question}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {question.options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`p-2 rounded text-sm ${
                                    optIndex === question.correctAnswer
                                      ? 'bg-green-100 border border-green-300'
                                      : 'bg-gray-50'
                                  }`}
                                >
                                  <span className="font-medium">
                                    {getCorrectAnswerLetter(optIndex)}:
                                  </span>{' '}
                                  {option}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(question)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Savolni o'chirish</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Bu savolni o'chirishni xohlaysizmi? Bu amal bekor qilib bo'lmaydi.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteQuestionMutation.mutate(question.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    O'chirish
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-6">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm">
                          {currentPage} / {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

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
                      <Label htmlFor="option1">A-variant</Label>
                      <Input
                        id="option1"
                        value={formData.option1}
                        onChange={(e) => setFormData({...formData, option1: e.target.value})}
                        placeholder="Birinchi variant..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="option2">B-variant</Label>
                      <Input
                        id="option2"
                        value={formData.option2}
                        onChange={(e) => setFormData({...formData, option2: e.target.value})}
                        placeholder="Ikkinchi variant..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="option3">C-variant</Label>
                      <Input
                        id="option3"
                        value={formData.option3}
                        onChange={(e) => setFormData({...formData, option3: e.target.value})}
                        placeholder="Uchinchi variant..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="option4">D-variant</Label>
                      <Input
                        id="option4"
                        value={formData.option4}
                        onChange={(e) => setFormData({...formData, option4: e.target.value})}
                        placeholder="To'rtinchi variant..."
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="correctAnswer">To'g'ri javob</Label>
                      <Select 
                        value={formData.correctAnswer.toString()} 
                        onValueChange={(value) => setFormData({...formData, correctAnswer: parseInt(value)})}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="To'g'ri javobni tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">A - {formData.option1 || 'Birinchi variant'}</SelectItem>
                          <SelectItem value="1">B - {formData.option2 || 'Ikkinchi variant'}</SelectItem>
                          <SelectItem value="2">C - {formData.option3 || 'Uchinchi variant'}</SelectItem>
                          <SelectItem value="3">D - {formData.option4 || 'To\'rtinchi variant'}</SelectItem>
                        </SelectContent>
                      </Select>
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

        {/* Edit Question Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Savolni tahrirlash</DialogTitle>
              <DialogDescription>
                Savol ma'lumotlarini o'zgartiring
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="edit-question">Savol</Label>
                <Textarea
                  id="edit-question"
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  placeholder="Savolni kiriting..."
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-option1">A-variant</Label>
                  <Input
                    id="edit-option1"
                    value={formData.option1}
                    onChange={(e) => setFormData({...formData, option1: e.target.value})}
                    placeholder="Birinchi variant..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-option2">B-variant</Label>
                  <Input
                    id="edit-option2"
                    value={formData.option2}
                    onChange={(e) => setFormData({...formData, option2: e.target.value})}
                    placeholder="Ikkinchi variant..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-option3">C-variant</Label>
                  <Input
                    id="edit-option3"
                    value={formData.option3}
                    onChange={(e) => setFormData({...formData, option3: e.target.value})}
                    placeholder="Uchinchi variant..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-option4">D-variant</Label>
                  <Input
                    id="edit-option4"
                    value={formData.option4}
                    onChange={(e) => setFormData({...formData, option4: e.target.value})}
                    placeholder="To'rtinchi variant..."
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-correctAnswer">To'g'ri javob</Label>
                  <Select 
                    value={formData.correctAnswer.toString()} 
                    onValueChange={(value) => setFormData({...formData, correctAnswer: parseInt(value)})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="To'g'ri javobni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">A - {formData.option1 || 'Birinchi variant'}</SelectItem>
                      <SelectItem value="1">B - {formData.option2 || 'Ikkinchi variant'}</SelectItem>
                      <SelectItem value="2">C - {formData.option3 || 'Uchinchi variant'}</SelectItem>
                      <SelectItem value="3">D - {formData.option4 || 'To\'rtinchi variant'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-category">Kategoriya</Label>
                  <Input
                    id="edit-category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="innovatsion_iqtisodiyot"
                    className="mt-1"
                  />
                </div>
              </div>
            </form>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingQuestion(null);
                }}
              >
                Bekor qilish
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={updateQuestionMutation.isPending}
              >
                {updateQuestionMutation.isPending ? 'Yangilanmoqda...' : 'Saqlash'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}