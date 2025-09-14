import { NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import { ReadableStream } from 'stream/web';
import { getPath } from '../../../database/file';

export async function GET(request, { params }) {
  const { hash } = await params;
  const [ file, mimeType ] = hash.split('-');
  const readable = ReadableStream.from(createReadStream(getPath(hash)));
  return new NextResponse(readable, {headers: {'Content-Type': mimeType}});
}
