import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import Layout from "../components/Layout/Layout";
import { Button } from "../components/ui/button";
import EntranceAnimation from "../components/ui/EntranceAnimation";

const NotFound = () => {
  const navigate = useNavigate();
  const { showAdvancedLoading, hideLoading } = useLoading();

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress <= 100) {
        showAdvancedLoading("Page not found", progress);
      } else {
        clearInterval(interval);
        hideLoading();
      }
    }, 100);

    return () => {
      clearInterval(interval);
      hideLoading();
    };
  }, []);

  return (
    <Layout>
      <EntranceAnimation type="fade" duration={0.5}>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/")}>
            Return Home
          </Button>
        </div>
      </EntranceAnimation>
    </Layout>
  );
};

export default NotFound;
