// services/policyEngine.ts
// Tiny policy evaluator: express policies as JS functions or load JSON policies.
// For production, integrate an OPA server or use Rego + WASM.
type PolicyContext = { userId?: string; role?: string; action: string; resource?: string; [k: string]: any };

export type Policy = (ctx: PolicyContext) => { allow: boolean; reason?: string };

const policies: Record<string, Policy> = {};

// Example: register a policy
export function registerPolicy(name: string, policy: Policy) {
  policies[name] = policy;
}

export function evaluatePolicy(name: string, ctx: PolicyContext) {
  const p = policies[name];
  if (!p) return { allow: false, reason: 'policy_not_found' };
  try {
    return p(ctx);
  } catch (err: any) {
    return { allow: false, reason: err.message };
  }
}

// Bootstrap example policy
registerPolicy('admin-only', (ctx) => ({ allow: ctx.role === 'admin', reason: ctx.role === 'admin' ? undefined : 'requires admin' }));
