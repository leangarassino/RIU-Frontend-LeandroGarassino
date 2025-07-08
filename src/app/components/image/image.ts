import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.html',
  styleUrl: './image.scss',
})
export class Image {
  @Output() emitImage: EventEmitter<string> = new EventEmitter();
  @Input() base64String: string | undefined = undefined;

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.base64String = reader.result as string;
        this.emitImage.emit(this.base64String);
      };
      reader.readAsDataURL(file);
    }
  }
}
