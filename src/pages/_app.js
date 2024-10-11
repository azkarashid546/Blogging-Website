import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/hero.css";
import "@/styles/popularBlogs.css";
import "@/styles/section.css";
import "@/styles/blogs.css";
import "@/styles/sidebarcard.css";
import "@/styles/footer.css";
import "@/styles/singleBlog.css";
import "@/styles/singlehero.css";
import "@/styles/commentView.css";
import "@/styles/commentForm.css";
import "@/styles/dashboard.css";
import "@/styles/addblog.css";
import "@/styles/login.css";
import "@/styles/signup.css";
import "@/styles/contactus.css";
import "@/styles/dashboardnavbar.css";
import Layout from "@/pages/components/layout";
import Dashlayout from "./components/dashlayout";
import '@/styles/about.css'
import { useRouter } from "next/router";
import '@/styles/blogpreview.css'
import '@/styles/search.css'
import '@/styles/usersettings.css'
import { ThemeProvider } from '@/contexts/themeContext';
import '../styles/globals.css'; // Ensure correct import path
export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();

  console.log(pathname);

  return (
    <>
      <ThemeProvider>
      <Layout>
        <div style={{ marginTop: '120px' }}>
          <Component {...pageProps} />
        </div>
      </Layout>
      </ThemeProvider>
    
    </>
  );
}
