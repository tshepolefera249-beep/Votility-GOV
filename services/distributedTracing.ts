// services/distributedTracing.ts
// Lightweight OpenTelemetry initialization for Node services
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

let sdk: NodeSDK | null = null;

export async function initTracing() {
  if (sdk) return;
  const exporter = new OTLPTraceExporter({
    url: process.env.OTEL_COLLECTOR_URL || 'http://localhost:4318/v1/traces',
  });
  sdk = new NodeSDK({
    traceExporter: exporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });
  await sdk.start();
  console.log('Tracing initialized');
}

export async function shutdownTracing() {
  if (!sdk) return;
  await sdk.shutdown();
  sdk = null;
}
