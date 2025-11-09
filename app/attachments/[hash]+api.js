import { createReadStream } from 'fs';
import { ReadableStream } from 'stream/web';
import { getPath } from '../../database/file';

export async function GET(request, { hash }) {
  let [file, mimeType] = hash.split('-');
  mimeType = Buffer.from(mimeType, 'hex').toString();
  const readable = ReadableStream.from(createReadStream(getPath(hash)));
  return new Response(readable, { headers: { 'Content-Type': mimeType } });
}
