import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialog, AlertDialogData } from '../alert-dialog/alert-dialog';

const MAX_FILE_SIZE_KB = 300;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_KB * 1024;

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.html',
  styleUrl: './image.scss',
})
export class Image {
  @Output() emitImage: EventEmitter<string> = new EventEmitter();
  @Input() base64String: string | undefined = undefined;
  dialog = inject(MatDialog);

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        this.dialog.open<AlertDialog, AlertDialogData>(AlertDialog, {
          data: {
            title: 'Ha ocurrido un error',
            content: 'Solo se permiten imágenes en formato JPEG y PNG.',
          },
        });
        fileInput.value = '';
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        this.dialog.open<AlertDialog, AlertDialogData>(AlertDialog, {
          data: {
            title: 'Ha ocurrido un error',
            content: 'El tamaño máximo de la imagen es de 300kb',
          },
        });
        fileInput.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.base64String = reader.result as string;
        this.emitImage.emit(this.base64String);
      };
      reader.readAsDataURL(file);
    }
  }
}
