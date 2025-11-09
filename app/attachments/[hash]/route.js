import { NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import { ReadableStream } from 'stream/web';
import { getPath } from '../../../database/file';

export async function GET(request, { params }) {
  const { hash } = await params;
  let [file, mimeType] = hash.split('-');
  mimeType = Buffer.from(mimeType, 'hex').toString();
  const readable = ReadableStream.from(createReadStream(getPath(hash)));
  return new NextResponse(readable, { headers: { 'Content-Type': mimeType } });
}
