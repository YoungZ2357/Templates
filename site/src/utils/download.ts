import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { FileWithMeta } from '../types';
import { fetchFileBlob } from './github';

/**
 * Download selected files as a zip archive, preserving directory structure.
 */
export async function downloadAsZip(
  files: FileWithMeta[],
  onProgress?: (done: number, total: number) => void
): Promise<void> {
  const zip = new JSZip();
  let done = 0;

  await Promise.all(
    files.map(async (file) => {
      const blob = await fetchFileBlob(file);
      zip.file(file.path, blob);
      done++;
      onProgress?.(done, files.length);
    })
  );

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'templates.zip');
}
