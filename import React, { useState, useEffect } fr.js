import React, { useState, useEffect } from 'react';
import { ChevronRight, Upload, Brain, BookOpen, Target, BarChart3, Volume2, Languages, CheckCircle, XCircle, Play, Pause } from 'lucide-react';

const AILearningAssistant = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedContent, setUploadedContent] = useState('');
  const [studyPlan, setStudyPlan] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [language, setLanguage] = useState('english');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState({
    totalStudyHours: 45,
    completedHours: 28,
    weakAreas: ['Calculus', 'Quantum Physics'],
    strongAreas: ['Linear Algebra', 'Mechanics']
  });

  // Sample content for demo
  const sampleContent = `Machine Learning Fundamentals

Chapter 1: Introduction to Machine Learning
Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed. There are three main types: supervised learning (learning from labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error).

Key Concepts:
- Algorithms: Mathematical procedures that analyze data
- Training Data: The dataset used to teach the algorithm
- Features: Individual measurable properties of observed phenomena
- Model: The output of an algorithm after training on data

Chapter 2: Linear Regression
Linear regression is a statistical method for modeling the relationship between a dependent variable and independent variables. It assumes a linear relationship and is often the first algorithm students learn.`;

  const sampleQuizQuestions = [
    {
      question: "What are the three main types of machine learning?",
      options: [
        "Supervised, Unsupervised, Reinforcement",
        "Linear, Non-linear, Deep",
        "Classification, Regression, Clustering",
        "Neural, Decision Tree, SVM"
      ],
      correct: 0,
      explanation: "The three main types are supervised learning (learning from labeled data), unsupervised learning (finding patterns without labels), and reinforcement learning (learning through rewards and penalties)."
    },
    {
      question: "What is a feature in machine learning?",
      options: [
        "The final output of a model",
        "An individual measurable property of observed phenomena",
        "The algorithm used for training",
        "The error rate of predictions"
      ],
      correct: 1,
      explanation: "Features are individual measurable properties or characteristics of the phenomena being observed and analyzed."
    }
  ];

  // Generate AI response based on question and content
  const generateAIResponse = (question) => {
    setIsGenerating(true);
    // Simulate AI processing delay
    setTimeout(() => {
      let response = '';
      const lowerQuestion = question.toLowerCase();
      
      if (lowerQuestion.includes('machine learning') || lowerQuestion.includes('ml')) {
        response = getDifficultyBasedResponse(
          "Machine learning is a method where computers learn from data to make predictions or decisions. It's like teaching a computer to recognize patterns!",
          "Machine learning is a subset of AI that uses statistical techniques to enable computers to improve at tasks through experience. It involves training algorithms on data to make predictions or classifications.",
          "Machine learning employs computational statistics and optimization theory to build mathematical models from training data. The fundamental premise is that systems can automatically learn and improve from experience without being explicitly programmed for each specific task."
        );
      } else if (lowerQuestion.includes('linear regression')) {
        response = getDifficultyBasedResponse(
          "Linear regression draws the best straight line through data points to predict values. It's like finding the line of best fit on a graph!",
          "Linear regression is a statistical method that models the relationship between variables using a linear equation. It minimizes the sum of squared residuals to find the optimal line.",
          "Linear regression implements the method of least squares optimization to estimate coefficients β in the equation y = Xβ + ε, where the objective function minimizes ||y - Xβ||² subject to various regularization constraints."
        );
      } else if (lowerQuestion.includes('supervised learning')) {
        response = getDifficultyBasedResponse(
          "Supervised learning uses examples with correct answers to teach the computer. It's like learning with a teacher who shows you the right answers!",
          "Supervised learning trains algorithms using labeled datasets, where both input features and corresponding target outputs are provided during training.",
          "Supervised learning implements empirical risk minimization over a hypothesis class H, where the algorithm seeks to minimize the expected loss E[(f(x) - y)²] using labeled training data (xi, yi)."
        );
      } else {
        response = getDifficultyBasedResponse(
          "That's a great question! Based on the content you've uploaded, I can help explain concepts in simple terms with examples.",
          "I can provide detailed explanations based on your study material. Could you be more specific about which concept you'd like me to explain?",
          "I can offer comprehensive analysis of complex topics from your uploaded content. Please specify which theoretical framework or mathematical concept you'd like me to elaborate on."
        );
      }
      
      if (language === 'hindi') {
        response = translateToHindi(response);
      }
      
      setAiResponse(response);
      setIsGenerating(false);
    }, 1500);
  };

  const getDifficultyBasedResponse = (simple, medium, advanced) => {
    switch(difficulty) {
      case 'simple': return simple;
      case 'advanced': return advanced;
      default: return medium;
    }
  };

  const translateToHindi = (text) => {
    // Simplified translation simulation
    const translations = {
      'Machine learning': 'मशीन लर्निंग',
      'computer': 'कंप्यूटर',
      'data': 'डेटा',
      'algorithm': 'एल्गोरिदम'
    };
    
    let translated = text;
    Object.entries(translations).forEach(([english, hindi]) => {
      translated = translated.replace(new RegExp(english, 'gi'), hindi);
    });
    return translated;
  };

  const generateStudyPlan = () => {
    const plan = {
      duration: '4 weeks',
      dailyHours: 2,
      schedule: [
        {
          week: 1,
          topic: 'ML Fundamentals',
          tasks: ['Read Chapter 1', 'Complete basic quiz', 'Practice exercises'],
          hours: 14
        },
        {
          week: 2,
          topic: 'Linear Regression',
          tasks: ['Study regression theory', 'Implement basic model', 'Advanced quiz'],
          hours: 14
        },
        {
          week: 3,
          topic: 'Classification',
          tasks: ['Logistic regression', 'Decision trees', 'Model evaluation'],
          hours: 14
        },
        {
          week: 4,
          topic: 'Advanced Topics',
          tasks: ['Neural networks intro', 'Project work', 'Final assessment'],
          hours: 14
        }
      ]
    };
    setStudyPlan(plan);
  };

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setQuizAnswered(true);
    
    if (answerIndex === quizQuestions[currentQuizIndex].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setQuizAnswered(false);
      setSelectedAnswer('');
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    setQuizQuestions(sampleQuizQuestions);
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Welcome to Your AI Learning Assistant</h2>
        <p className="opacity-90">Your personalized AI tutor is ready to help you learn more effectively.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Study Progress</h3>
            <BarChart3 className="text-blue-500" size={24} />
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span>{Math.round((progress.completedHours / progress.totalStudyHours) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(progress.completedHours / progress.totalStudyHours) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{progress.completedHours}/{progress.totalStudyHours} hours completed</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Weak Areas</h3>
            <Target className="text-red-500" size={24} />
          </div>
          <div className="space-y-2">
            {progress.weakAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{area}</span>
                <button className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Focus</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Strong Areas</h3>
            <CheckCircle className="text-green-500" size={24} />
          </div>
          <div className="space-y-2">
            {progress.strongAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{area}</span>
                <CheckCircle className="text-green-500" size={16} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveTab('content')}
              className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center"
            >
              <Upload className="text-blue-500 mr-3" size={20} />
              <span>Upload New Content</span>
              <ChevronRight className="ml-auto text-gray-400" size={16} />
            </button>
            <button 
              onClick={() => setActiveTab('tutor')}
              className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors flex items-center"
            >
              <Brain className="text-green-500 mr-3" size={20} />
              <span>Ask AI Tutor</span>
              <ChevronRight className="ml-auto text-gray-400" size={16} />
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex items-center"
            >
              <BookOpen className="text-purple-500 mr-3" size={20} />
              <span>Take Practice Quiz</span>
              <ChevronRight className="ml-auto text-gray-400" size={16} />
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span>Completed Linear Regression quiz - 85% score</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>Asked 3 questions about ML fundamentals</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span>Uploaded new study material</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentUpload = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Learning Content</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 mb-4">Drag and drop your files here, or click to browse</p>
          <button 
            onClick={() => setUploadedContent(sampleContent)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Use Sample Content (Demo)
          </button>
        </div>

        {uploadedContent && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Uploaded Content Preview:</h3>
            <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{uploadedContent.substring(0, 500)}...</pre>
            </div>
            <div className="mt-4 flex space-x-3">
              <button 
                onClick={generateStudyPlan}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Generate Study Plan
              </button>
              <button 
                onClick={() => setActiveTab('tutor')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Learning
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStudyPlan = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Personalized Study Plan</h2>
        
        {!studyPlan ? (
          <div className="text-center py-8">
            <Target className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-4">Upload content first to generate your personalized study plan</p>
            <button 
              onClick={() => setActiveTab('content')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Upload Content
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Plan Overview</h3>
              <p className="text-blue-600">Duration: {studyPlan.duration} | Daily: {studyPlan.dailyHours} hours</p>
            </div>
            
            {studyPlan.schedule.map((week, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-800">Week {week.week}: {week.topic}</h4>
                  <span className="text-sm text-gray-500">{week.hours} hours</span>
                </div>
                <div className="space-y-2">
                  {week.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={16} />
                      <span className="text-gray-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAITutor = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">AI Tutor Chat</h2>
          <div className="flex space-x-3">
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="simple">Simple</option>
              <option value="medium">Medium</option>
              <option value="advanced">Advanced</option>
            </select>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-3 mb-3">
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              placeholder="Ask me anything about your study material..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && generateAIResponse(currentQuestion)}
            />
            <button
              onClick={() => generateAIResponse(currentQuestion)}
              disabled={isGenerating || !currentQuestion.trim()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isGenerating ? 'Thinking...' : 'Ask'}
            </button>
          </div>
          
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setCurrentQuestion("What is machine learning?")}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
            >
              What is machine learning?
            </button>
            <button
              onClick={() => setCurrentQuestion("Explain linear regression")}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
            >
              Explain linear regression
            </button>
            <button
              onClick={() => setCurrentQuestion("Types of supervised learning")}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
            >
              Types of supervised learning
            </button>
          </div>
        </div>

        {aiResponse && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-800">AI Tutor Response:</h3>
              <button
                onClick={() => isSpeaking ? stopSpeaking() : speakText(aiResponse)}
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors"
              >
                {isSpeaking ? <Pause size={16} /> : <Volume2 size={16} />}
                <span className="text-sm">{isSpeaking ? 'Stop' : 'Listen'}</span>
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{aiResponse}</p>
            <div className="mt-3 flex items-center space-x-2 text-sm text-gray-500">
              <span>Difficulty: {difficulty}</span>
              <span>•</span>
              <span>Language: {language}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Adaptive Quiz</h2>
          <div className="text-sm text-gray-500">
            Question {currentQuizIndex + 1} of {quizQuestions.length} | Score: {quizScore}/{quizQuestions.length}
          </div>
        </div>

        {quizQuestions.length > 0 && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">
                {quizQuestions[currentQuizIndex].question}
              </h3>
              <div className="space-y-2">
                {quizQuestions[currentQuizIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={quizAnswered}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      quizAnswered
                        ? index === quizQuestions[currentQuizIndex].correct
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : index === selectedAnswer && index !== quizQuestions[currentQuizIndex].correct
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-50 border-gray-300'
                        : 'bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    <span className="mr-3 font-semibold">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                    {quizAnswered && index === quizQuestions[currentQuizIndex].correct && (
                      <CheckCircle className="inline ml-2 text-green-500" size={16} />
                    )}
                    {quizAnswered && index === selectedAnswer && index !== quizQuestions[currentQuizIndex].correct && (
                      <XCircle className="inline ml-2 text-red-500" size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {quizAnswered && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Explanation:</h4>
                <p className="text-yellow-700">{quizQuestions[currentQuizIndex].explanation}</p>
                
                {currentQuizIndex < quizQuestions.length - 1 ? (
                  <button
                    onClick={nextQuizQuestion}
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Next Question
                  </button>
                ) : (
                  <div className="mt-3">
                    <p className="text-green-700 font-semibold">
                      Quiz Complete! Final Score: {quizScore}/{quizQuestions.length} ({Math.round((quizScore/quizQuestions.length)*100)}%)
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'content', label: 'Content Upload', icon: Upload },
    { id: 'plan', label: 'Study Plan', icon: Target },
    { id: 'tutor', label: 'AI Tutor', icon: Brain },
    { id: 'quiz', label: 'Quiz', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Brain className="text-blue-500" size={32} />
              <h1 className="text-xl font-bold text-gray-900">AI Learning Assistant</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Languages className="text-gray-400" size={20} />
              <Volume2 className="text-gray-400" size={20} />
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                S
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'content' && renderContentUpload()}
        {activeTab === 'plan' && renderStudyPlan()}
        {activeTab === 'tutor' && renderAITutor()}
        {activeTab === 'quiz' && renderQuiz()}
      </main>
    </div>
  );
};

export default AILearningAssistant;