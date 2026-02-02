import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import ScrollToTop from "@/components/ScrollToTop";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { BackButton } from "@/components/BackButton";
import { Landing } from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Syllabus from "./pages/Syllabus";
import SyllabusG1 from "./pages/SyllabusG1";
import SyllabusG2 from "./pages/SyllabusG2";
import SyllabusG4 from "./pages/SyllabusG4";
import PreviousPapers from "./pages/PreviousPapers";
import PapersByYear from "./pages/PapersByYear";
import PapersByGroup from "./pages/PapersByGroup";
import BooksStandards from "./pages/BooksStandards";
import StandardBooks from "./pages/StandardBooks";
import Tirukural from "./pages/Tirukural";
import Notes from "./pages/Notes";
import Poets from "./pages/Poets";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import Quiz from "./pages/Quiz";
import QuizTamil from "./pages/QuizTamil";
import QuizGS from "./pages/QuizGS";
import QuizMaths from "./pages/QuizMaths";
import TNPSCWizardAI from "./pages/TNPSCWizardAI";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();
//Tnpsc Project Completed

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="tnpsc-ui-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <BackButton />
              <ScrollToTopButton />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/home" element={<ProtectedRoute requireAdmin={false}><Dashboard /></ProtectedRoute>} />
                <Route path="/syllabus" element={<ProtectedRoute requireAdmin={false}><Syllabus /></ProtectedRoute>} />
                <Route path="/syllabus/g1" element={<ProtectedRoute requireAdmin={false}><SyllabusG1 /></ProtectedRoute>} />
                <Route path="/syllabus/g2" element={<ProtectedRoute requireAdmin={false}><SyllabusG2 /></ProtectedRoute>} />
                <Route path="/syllabus/g4" element={<ProtectedRoute requireAdmin={false}><SyllabusG4 /></ProtectedRoute>} />
                <Route path="/previous-papers" element={<ProtectedRoute requireAdmin={false}><PreviousPapers /></ProtectedRoute>} />
                <Route path="/previous-papers/:year" element={<ProtectedRoute requireAdmin={false}><PapersByYear /></ProtectedRoute>} />
                <Route path="/previous-papers/:year/:group" element={<ProtectedRoute requireAdmin={false}><PapersByGroup /></ProtectedRoute>} />
                <Route path="/books/standards" element={<ProtectedRoute requireAdmin={false}><BooksStandards /></ProtectedRoute>} />
                <Route path="/books/:grade" element={<ProtectedRoute requireAdmin={false}><StandardBooks /></ProtectedRoute>} />
                <Route path="/tirukural" element={<ProtectedRoute requireAdmin={false}><Tirukural /></ProtectedRoute>} />
                <Route path="/notes" element={<ProtectedRoute requireAdmin={false}><Notes /></ProtectedRoute>} />
                <Route path="/poets" element={<ProtectedRoute requireAdmin={false}><Poets /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><Admin /></ProtectedRoute>} />
                <Route path="/quiz" element={<ProtectedRoute requireAdmin={false}><Quiz /></ProtectedRoute>} />
                <Route path="/quiz/tamil" element={<ProtectedRoute requireAdmin={false}><QuizTamil /></ProtectedRoute>} />
                <Route path="/quiz/gs" element={<ProtectedRoute requireAdmin={false}><QuizGS /></ProtectedRoute>} />
                <Route path="/quiz/maths" element={<ProtectedRoute requireAdmin={false}><QuizMaths /></ProtectedRoute>} />
                <Route path="/ai-chat" element={<ProtectedRoute requireAdmin={false}><TNPSCWizardAI /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
