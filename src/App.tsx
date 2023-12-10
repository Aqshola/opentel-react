import { trace, Span } from "@opentelemetry/api";
import { useEffect } from "react";
import * as Sentry from "@sentry/react";
function App() {
  async function dummyFetch() {
    try {
      const tracer = trace.getTracer("RANDOM-TRACE");
      tracer.startActiveSpan("dumdumdum", async (span: Span) => {
        const res = await fetch("https://randomuser.me/");
        span.end();
        return res;
      });
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    dummyFetch();
  }, []);

  return (
    <>
      <div>Hello World</div>
      <button
        onClick={() => {
          throw new Error("sasageyo");
        }}
      >
        Tes
      </button>
    </>
  );
}

export default App;
