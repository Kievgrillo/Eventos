import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from 'src/app/services/evento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Evento } from 'src/app/models/Evento';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form: FormGroup;
  evento = {} as Evento;
  estadoSalvar = 'post'

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
              private localService: BsLocaleService,
              private router: ActivatedRoute,
              private EventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService)
  {
      this.localService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

        if(eventoIdParam != null){
          this.spinner.show();

          this.estadoSalvar = 'put';

          this.EventoService.getEventoById(+eventoIdParam).subscribe(
            (evento: Evento) => {
              this.evento = {...evento};
              this.form.patchValue(this.evento);
            },
            (error: any) => {
              this.spinner.hide();
              this.toastr.error('Erro ao carregar Evento.', 'Erro!')
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
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public salvarAlteracao(): void {
    this.spinner.show();

      if (this.form.valid) {
        if(this.estadoSalvar == 'post') {
          this.evento = {...this.form.value};
        this.EventoService.postEvento(this.evento).subscribe(
          () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar evento', 'Erro');
          },
          () => this.spinner.hide()
        );
      } else {
        this.evento = {id: this.evento.id, ...this.form.value};
        this.EventoService.putEvento(this.evento.id, this.evento).subscribe(
          () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar evento', 'Erro');
          },
          () => this.spinner.hide()
        );
       }
     }
  }
}
