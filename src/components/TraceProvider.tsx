/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { Resource } from "@opentelemetry/resources";

import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

import {
  WebTracerProvider,
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-web";

import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

import { registerInstrumentations } from "@opentelemetry/instrumentation";

import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";

const consoleExporter = new ConsoleSpanExporter();

const collectorExporter = new OTLPTraceExporter({
  url: "http://localhost/trace",
});

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "OPENTEL-REACT",
  }),
});

const fetchInstrumentation = new FetchInstrumentation({});

fetchInstrumentation.setTracerProvider(provider);

provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));

provider.addSpanProcessor(new SimpleSpanProcessor(collectorExporter));

provider.register();

registerInstrumentations({
  instrumentations: [fetchInstrumentation],

  tracerProvider: provider,
});

type Props = {
  children: React.ReactNode;
};
export default function TraceProvider({ children }: Props) {
  return <>{children}</>;
}
