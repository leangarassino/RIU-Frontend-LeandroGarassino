import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Image } from './image';
import { EventEmitter } from '@angular/core';
import { AlertDialog } from '../alert-dialog/alert-dialog';

describe('ImageComponent', () => {
  let component: Image;
  let fixture: ComponentFixture<Image>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let openDialogSpy: jasmine.Spy;
  let readerSpy: jasmine.SpyObj<FileReader>;

  const MAX_FILE_SIZE_BYTES = 300 * 1024;

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    openDialogSpy = mockMatDialog.open.and.returnValue({
      afterClosed: () => new EventEmitter<any>(),
    } as any);

    await TestBed.configureTestingModule({
      imports: [Image, MatDialogModule],
      providers: [{ provide: MatDialog, useValue: mockMatDialog }],
    }).compileComponents();

    fixture = TestBed.createComponent(Image);
    component = fixture.componentInstance;
    fixture.detectChanges();
    readerSpy = jasmine.createSpyObj('FileReader', ['readAsDataURL']);
    Object.defineProperty(readerSpy, 'result', {
      writable: true,
      value: 'data:image/png;base64,mocked_base64_image',
    });
    spyOn(window as any, 'FileReader').and.returnValue(readerSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do nothing if no file is selected', () => {
    const event = { target: { files: null } } as unknown as Event;
    component.onImageSelected(event);

    expect(mockMatDialog.open).not.toHaveBeenCalled();
    expect(component.base64String).toBeUndefined();
    spyOn(component.emitImage, 'emit');
    expect(component.emitImage.emit).not.toHaveBeenCalled();
  });

  it('should display an error for disallowed file types', () => {
    const mockFile = new File([''], 'test.txt', { type: 'text/plain' });
    const mockFileList = { 0: mockFile, length: 1 } as unknown as FileList;
    const mockFileInput = {
      files: mockFileList,
      value: '',
    } as HTMLInputElement;
    const event = { target: mockFileInput } as unknown as Event;

    component.onImageSelected(event);

    expect(mockMatDialog.open).toHaveBeenCalledWith(AlertDialog, {
      data: {
        title: 'Ha ocurrido un error',
        content: 'Solo se permiten imágenes en formato JPEG y PNG.',
      },
    });
    expect(mockFileInput.value).toBe('');
    expect(component.base64String).toBeUndefined();
    spyOn(component.emitImage, 'emit');
    expect(component.emitImage.emit).not.toHaveBeenCalled();
  });

  it('should display an error if the file size exceeds the limit', () => {
    const mockFile = new File(
      [new ArrayBuffer(MAX_FILE_SIZE_BYTES + 1)],
      'large.png',
      { type: 'image/png' },
    );
    const mockFileList = { 0: mockFile, length: 1 } as unknown as FileList;
    const mockFileInput = {
      files: mockFileList,
      value: '',
    } as HTMLInputElement;
    const event = { target: mockFileInput } as unknown as Event;

    component.onImageSelected(event);

    expect(mockMatDialog.open).toHaveBeenCalledWith(AlertDialog, {
      data: {
        title: 'Ha ocurrido un error',
        content: 'El tamaño máximo de la imagen es de 300kb',
      },
    });
    expect(mockFileInput.value).toBe('');
    expect(component.base64String).toBeUndefined();
    spyOn(component.emitImage, 'emit');
    expect(component.emitImage.emit).not.toHaveBeenCalled();
  });

  it('should process a valid PNG image file and emit the base64 string', fakeAsync(() => {
    const mockFile = new File(['valid_image_data'], 'test.png', {
      type: 'image/png',
    });
    Object.defineProperty(mockFile, 'size', { value: MAX_FILE_SIZE_BYTES - 1 });

    const mockFileList = { 0: mockFile, length: 1 } as unknown as FileList;
    const mockFileInput = {
      files: mockFileList,
      value: '',
    } as HTMLInputElement;
    const event = { target: mockFileInput } as unknown as Event;

    spyOn(component.emitImage, 'emit');

    component.onImageSelected(event);

    expect(readerSpy.readAsDataURL).toHaveBeenCalledWith(mockFile);

    readerSpy.onload!({
      target: readerSpy,
    } as unknown as ProgressEvent<FileReader>);

    tick();

    expect(mockMatDialog.open).not.toHaveBeenCalled();
    expect(mockFileInput.value).toBe('');
    expect(component.base64String).toBe(
      'data:image/png;base64,mocked_base64_image',
    );
    expect(component.emitImage.emit).toHaveBeenCalledWith(
      'data:image/png;base64,mocked_base64_image',
    );
  }));

  it('should process a valid JPEG file and emit the base64 string', fakeAsync(() => {
    const mockFile = new File(['valid_image_data_jpeg'], 'test.jpeg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(mockFile, 'size', { value: MAX_FILE_SIZE_BYTES - 1 });

    const mockFileList = { 0: mockFile, length: 1 } as unknown as FileList;
    const mockFileInput = {
      files: mockFileList,
      value: '',
    } as HTMLInputElement;
    const event = { target: mockFileInput } as unknown as Event;

    spyOn(component.emitImage, 'emit');

    component.onImageSelected(event);

    expect(readerSpy.readAsDataURL).toHaveBeenCalledWith(mockFile);

    readerSpy.onload!({
      target: readerSpy,
    } as unknown as ProgressEvent<FileReader>);
    tick();

    expect(mockMatDialog.open).not.toHaveBeenCalled();
    expect(mockFileInput.value).toBe('');
    expect(component.base64String).toBe(
      'data:image/png;base64,mocked_base64_image',
    );
    expect(component.emitImage.emit).toHaveBeenCalledWith(
      'data:image/png;base64,mocked_base64_image',
    );
  }));
});
