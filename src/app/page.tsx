import ClientOnly from "@/utils/ClientOnly";
import IntroController from "@/components/intro/IntroController";

export default function HomePage() {
  return (
    <ClientOnly>
      <IntroController />
    </ClientOnly>
  );
}
