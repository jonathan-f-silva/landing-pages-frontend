import { ChakraProvider, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import MainLanding from "./components/MainLanding";
import Contact from "./components/Contact";
import Location from "./components/Location";
import theme from "./theme/index.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <VStack direction="column" alignItems="center" spacing={4}>
        <Header />
        <MainLanding />
        <Contact />
        <Location />
        <Footer />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
