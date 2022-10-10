import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-help',
  templateUrl: './avatar-help.component.html',
  styleUrls: ['./avatar-help.component.scss']
})
export class AvatarHelpComponent implements OnInit {

  @Output() reponsePack = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit(): void {
  }

  responseCreatePack(response: boolean) {
    this.reponsePack.emit(response);
  }

}
