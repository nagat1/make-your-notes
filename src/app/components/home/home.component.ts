import { Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../core/sevices/note.service';
import { Inote } from '../../core/interfaces/inote';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private _FormBuilder=inject(FormBuilder)
  private _NoteService=inject(NoteService)
  notes:Inote[]=[];
  @ViewChild('nagat') el!:ElementRef;
  @ViewChild('nagattt') y!:ElementRef;
  @ViewChild('fouad') x!:ElementRef;
  // //////////////
noteform:FormGroup=this._FormBuilder.group({
  title:[null,[Validators.required]],
  content:[null,[Validators.required]],
})
ngOnInit(): void {
  this.displaynote()
}
// //////////////////////
addnote(){
  console.log(this.noteform)
  this._NoteService.addnote(this.noteform.value).subscribe({
    next:(res)=>{console.log(res)
      this.noteform.reset();
      this.hide();
      
      this.displaynote();
    },
    error:(err)=>{console.log(err)}
  })
}

// ///////////////////
display(){
  this.el.nativeElement.classList.remove("d-none")
  this.el.nativeElement.classList.add("d-block")

}
// ////////////////////
displaynote(){
  this._NoteService.getusernotes().subscribe({  next:(res)=>{console.log(res)
    this.notes=res.notes;
  },
  error:(err)=>{console.log(err)
    if(err.error.msg=="not notes found"){
      
      this.notes=[];
    }
  }
})
}
hide(){
  this.el.nativeElement.classList.remove("d-block")
  this.el.nativeElement.classList.add("d-none")
}
deletenote(id:any){
  this._NoteService.deletenote(id).subscribe({
    next:(res)=>{console.log(res)
        this.displaynote();
      },
      error:(err)=>{console.log(err)}
    })
  }
  // ////////////update//////////
  updatenoteform:FormGroup=this._FormBuilder.group({
    _id:[null],
    title:[null,[Validators.required]],
    content:[null,[Validators.required]],
  })
  update(){
    const {_id,title,content}=this.updatenoteform.value;
    this._NoteService.updatenote(_id,{title,content}).subscribe({   next:(res)=>{console.log(res)
      this.displaynote();
      this.hideupdatenote();
    },
    error:(err)=>{console.log(err)}
  })
  
}
displayupdatenote(item:any){
  this.y.nativeElement.classList.remove("d-none")
  this.y.nativeElement.classList.add("d-block")
  this.updatenoteform.patchValue(item)
}

hideupdatenote(){
  this.y.nativeElement.classList.remove("d-block")
  this.y.nativeElement.classList.add("d-none")
  
}

}

