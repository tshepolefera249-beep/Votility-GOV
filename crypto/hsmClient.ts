// crypto/hsmClient.ts
import { KMSClient, SignCommand } from '@aws-sdk/client-kms';

const client = new KMSClient({ region: process.env.AWS_REGION || 'af-south-1' });

export async function signWithHSM(keyId: string, message: string) {
  const result = await client.send(
    new SignCommand({
      KeyId: keyId,
      Message: Buffer.from(message),
      SigningAlgorithm: 'RSASSA_PSS_SHA_256',
      MessageType: 'RAW'
    })
  );
  return result.Signature?.toString('base64');
}
