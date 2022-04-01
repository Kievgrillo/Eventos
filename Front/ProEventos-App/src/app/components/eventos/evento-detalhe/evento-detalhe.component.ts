import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormArray,
  FormBuilder,
  FormGroup,
  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { LoteService } from './../../../services/lote.service';

import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/models/evento';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],

})
export class EventoDetalheComponent implements OnInit {

  modalRef: BsModalRef;
  eventoId: number;
  evento = {} as Evento;
  form: FormGroup;
  estadoSalvar = 'post';


  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-orange',
      showWeekNumbers: false
    };
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private activatedRouter: ActivatedRoute,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private router: Router,
              private loteService: LoteService,)

              {
                this.localeService.use('pt-br');
              }

              // public carregarEvento(): void {
              //   this.eventoId = (+this.activatedRouter.snapshot.paramMap.get('id'));
              //   if (this.eventoId !== null && this.eventoId !== 0) {
              //      this.spinner.show();

              //     this.estadoSalvar = 'put';

              //     this.eventoService.getEventoById(this.eventoId).subscribe(
              //       (evento: Evento) => {
              //         this.evento = {...evento};
              //         this.form.patchValue(this.evento);
              //       },
              //       (error: any) => {
              //         this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
              //         console.error(error);
              //       }
              //       ).add(() => this.spinner.hide()
              //       );
              //     }
              //   }

              public carregarEvento(): void {
                const eventoIdParam = this.activatedRouter.snapshot.paramMap.get('id');

                if(eventoIdParam != null){
                  this.spinner.show();

                  this.estadoSalvar = 'put';

                  this.eventoService.getEventoById(+eventoIdParam).subscribe(
                    (evento: Evento) => {
                      this.evento = {...evento};
                      this.form.patchValue(this.evento);
                    },
                    (error: any) => {
                      this.spinner.hide();
                      this.toastr.error('Erro ao tentar carregar eventos', 'Erro!');
                      console.error(error);
                    },
                    () => this.spinner.hide(),
                  );
                }
              }

                ngOnInit(): void {
                  this.carregarEvento();
                  this.validation();
                }
                public validation(): void {
                  this.form = this.fb.group({
                    tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
                    local: ['', Validators.required],
                    dataEvento: ['', Validators.required],
                    qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
                    telefone: ['', Validators.required],
                    email: ['', [Validators.required, Validators.email]],
                    imagemURL: ['', Validators.required],
                    lotes: this.fb.array([])
                  });
                }

                public resetForm(): void {
                  this.form.reset();
                }

                public SalvarEvento(): any {
                  this.spinner.show();
                    if (this.form.valid) {
                      if(this.estadoSalvar == 'post') {
                        this.evento = {...this.form.value};
                      this.eventoService.postEvento(this.evento).subscribe(
                        () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso!'),
                        (error: any) => {
                          console.error(error);
                          this.spinner.hide();
                          this.toastr.error('Error ao salvar evento', 'Erro');
                        },
                        () => this.spinner.hide()
                      );
                    } else {
                      this.evento = {id: this.evento.id, ...this.form.value};
                      this.eventoService.putEvento(this.evento.id, this.evento).subscribe(
                        () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso!'),
                        (error: any) => {
                          console.error(error);
                          this.spinner.hide();
                          this.toastr.error('Error ao salvar evento', 'Erro');
                        },
                        () => this.spinner.hide()
                      );
                     }
                    }
                    this.router.navigateByUrl('eventos/lista');
                  }

                  declineDeleteLote(): void {
                    this.modalRef.hide();
                  }

                }

