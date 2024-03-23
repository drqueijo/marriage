export const usePaths = () => {
  const paths = {
    hero: {
      section: "#hero",
      page: "/",
      name: "Home",
    },
    noivos: {
      section: "#noivos",
      page: "/",
      name: "Os Noivos",
    },
    local: {
      section: "#local",
      page: "/",
      name: "Local",
    },
    presentes: {
      section: "#presentes",
      page: "/",
      name: "Presentes",
    },
  };

  const scrollTo = (section: string) => {
    const el = document.querySelector(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    paths,
    scrollTo,
  };
};
export default usePaths;
