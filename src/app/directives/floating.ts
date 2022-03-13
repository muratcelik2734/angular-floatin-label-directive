import {  Directive, ElementRef, HostListener, Input,  OnInit, Renderer2,  } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[floating-label]',
})
export class FloatingLabelDirective implements OnInit {
    label!: HTMLElement;
    @Input('placeholder') placeholder = '';
    elementValue = '';
    constructor(private el: ElementRef,
        private renderer: Renderer2,
        ) {



    }
    ngOnInit(): void {
        this.label = this.renderer.createElement('label');
        this.label.innerHTML = this.placeholder;
        this.label.classList.add('d-none');
        this.renderer.insertBefore(this.el.nativeElement.parentElement, this.label, this.el.nativeElement);
            if(this.el.nativeElement.value){
            this.floatingShow();
        }

        
    }

    
  
    @HostListener('focus', ['$event'])
    inputFocus(event: any) {
        this.floatingShow(); 
    }
    @HostListener('focusout', ['$event'])
    inputFocusOut(event: any) {
        if(!this.el.nativeElement.value){
          this.floatingHide(); 
        } 
    }

  
  
   
    floatingShow() {
        console.log('Show et');
        this.el.nativeElement.classList.add('inputForcus'); 
        this.label.classList.remove('d-none');
        this.label.classList.add('d-block');
        this.label.classList.add('floatingLabel');
    }

    floatingHide() {
        this.el.nativeElement.classList.remove('inputForcus'); 
        this.label.classList.remove('d-block');
        this.label.classList.remove('floatingLabel');
        this.label.classList.add('d-none');
    }
}
