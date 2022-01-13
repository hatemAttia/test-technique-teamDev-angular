import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiliereService } from '../shared/services/filiere.service';
import { Filiere } from '../shared/models/filiere';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  filiereForm: FormGroup;
  filiers?: Filiere[];
  gEnseignements: any;
  groupes:any;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private filiereServ: FiliereService,
    private toastr: ToastrService
  ) {
    this.filiereForm = this.formBuilder.group({
      id: [],
      nomFiliere: ['', Validators.required],
      population: ['', Validators.required],
      group: ['', Validators.required],
      UnitEnseignement: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.display();
  }

  display() {
    this.filiereServ.getFilieres().subscribe((res: any) => {
      this.filiers = res;
    });
    this.filiereServ.getgroupsEnseignenement().subscribe((res: any) => {
      this.gEnseignements = res;
    });
    this.filiereServ.getGroups().subscribe((res: any) => {
      this.groupes = res;
    });
  }

  openForm(content: any) {
    this.filiereForm.reset();
    this.modalService.open(content, { size: 'modale-size-m' });
  }

  updateForm(content: any, data: Filiere) {
    this.openForm(content);
    this.filiereForm.setValue(data);
  }

  enregister() {
    if (this.filiereForm.valid)
      if (this.filiereForm.controls.id.value) {
        this.filiereServ
          .updateFiliere(
            this.filiereForm.value,
            this.filiereForm.controls.id.value
          )
          .subscribe(
            (res: any) => {
              this.modalService.dismissAll();
              this.display();
              this.toastr.success('Success!', 'Filière modifié avec succès');
            },
            (err: any) => {
              this.toastr.error(
                'Error!',
                'Quelque chose est arrivé ,Veuillez reessayer plus tard'
              );
            }
          );
      } else {
        /**just for the test  */
        this.filiereForm.controls.id.setValue(this.genratedId());
        /** end just for the test  */

        this.filiereServ.addFiliere(this.filiereForm.value).subscribe(
          (res: any) => {
            this.display();
            this.toastr.success('Success!', 'Ajout avec succès!');
            this.modalService.dismissAll();
          },
          (err: any) => {
            this.toastr.error(
              'Error!',
              'Quelque chose est arrivé ,Veuillez reessayer plus tard'
            );
          }
        );
      }
  }

  deleteFiliere() {
    this.filiereServ
      .deleteFiliere(this.filiereForm.controls.id.value)
      .subscribe(
        (res: any) => {
          this.display();
          this.toastr.error('Success!', 'Filière supprimé');
          this.modalService.dismissAll();
        },
        (err: any) => {
          this.toastr.error(
            'Error!',
            'Quelque chose est arrivé ,Veuillez reessayer plus tard'
          );
        }
      );
    this.modalService.dismissAll();
  }

  genratedId() {
    return Math.floor(Math.random() * 100);
  }
}
