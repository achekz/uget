import Link from "next/link";
import { Home, FileText } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold font-heading text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">
          الصفحة غير موجودة
        </h2>
        <p className="text-ink/60 mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-paper font-semibold rounded-lg transition-all"
        >
          <Home className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </Link>
      </div>
    </div>
  );
}
