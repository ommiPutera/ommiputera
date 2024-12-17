import { Loading } from "~/components/loading";
import Section from "~/components/section";
import ShellPage from "~/components/shell-page";

export default function LoadingPage() {
  return (
    <ShellPage withHome withBack>
      <Section>
        <div className="min-h-screen flex justify-center items-center">
          <Loading />
        </div>
      </Section>
    </ShellPage>
  );
}
