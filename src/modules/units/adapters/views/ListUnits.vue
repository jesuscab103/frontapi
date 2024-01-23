<template>
  <div
    :class="{ modal: true, 'bd-example-modal-lg': true, show: showModal }"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content" id="DocumentPrint">
        <div class="modal-header" style="background: #1e1e1e; color: white">
          <h5 class="modal-title" id="TitleModalAdd">Datos de la unidad</h5>
          <button
            type="button"
            class="close"
            @click="closeModal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body col-md-12" id="BodyModalAdd">
          <form @submit.prevent="submitForm">
            <div class="mb-4 m-4">
              <label for="idgps">IDGPS:</label>
              <input v-model="unit.idgps" type="number" id="idgps" required />

              <label for="brand">Marca:</label>
              <input v-model="unit.brand" type="text" id="brand" required />
            </div>
            <br />
            <div class="mb-3">
              <label for="model">Modelo:</label>
              <input v-model="unit.model" type="text" id="model" required />

              <label for="plate">Placas:</label>
              <input v-model="unit.plate" type="text" id="plate" required />
            </div>

            <br />
            <div class="mb-3">
              <label for="serie">Serie:</label>
              <input v-model="unit.serie" type="text" id="serie" required />

              <label for="year">Año:</label>
              <input v-model="unit.year" type="text" id="year" required />
            </div>

            <br />
            <div class="mb-3">
              <label for="color">Color:</label>
              <input v-model="unit.color" type="text" id="color" required />

              <label for="line">Linea:</label>
              <input v-model="unit.line" type="text" id="line" required />
            </div>
            <br />
            <div class="mb-3">
              <label for="unit_name">Nombre de Unidad:</label>

              <input
                v-model="unit.unit_name"
                type="text"
                id="unit_name"
                required
              />
              <label for="group_name">Nombre de Grupo:</label>

              <input
                v-model="unit.group_name"
                type="text"
                id="group_name"
                required
              />
            </div>
            <button
              style="float: right; margin: 8px 4px"
              class="btn btn-outline-success"
              type="submit"
            >
              Guardar Datos
            </button>
            <br />
            <br />
            <div class="alert alert-secondary" role="alert">
              Estos Datos se se visualizarán en el Reporte
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="p-4">
    <div class="sectionunit">
      <h2 style="float: left; margin: 8px 4px">Datos de unidades</h2>
      <button
        style="float: right; margin: 8px 4px"
        type="button"
        class="btn btn-outline-dark"
        @click="openAdd"
      >
        Guardar Datos
      </button>
    </div>
    <br />
    <br />

    <table
      responsive
      style="width: 100%"
      class="table table-hover overflow: scroll;"
    >
      <thead class="table-dark">
        <tr>
          <th scope="col" style="width: 200px">IDGPS</th>
          <th scope="col" style="width: 200px">MARCA</th>
          <th scope="col" style="width: 200px">MODELO</th>
          <th scope="col" style="width: 200px">PLACAS</th>
          <th scope="col" style="width: 200px">SERIE</th>
          <th scope="col" style="width: 200px">AÑO</th>
          <th scope="col" style="width: 200px">COLOR</th>
          <th scope="col" style="width: 200px">LINEA</th>
          <th scope="col" style="width: 200px">NOMBRE_UNIDAD</th>
          <th scope="col" style="width: 200px">NOMBRE_GRUPO</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(unidad, index) in unidades" :key="index">
          <td>{{ unidad.IDGPS }}</td>
          <td>{{ unidad.MARCA }}</td>
          <td>{{ unidad.MODELO }}</td>
          <td>{{ unidad.PLACAS }}</td>
          <td>{{ unidad.SERIE }}</td>
          <td>{{ unidad.ANO }}</td>
          <td>{{ unidad.COLOR }}</td>
          <td>{{ unidad.LINEA }}</td>
          <td>{{ unidad.NOMBRE_UNIDAD }}</td>
          <td>{{ unidad.NOMBRE_GRUPO }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
//Agregar Dependencias
import Vue from "vue";
import { defineComponent } from "vue";
import axios from "axios";
import { Unit } from "../../entities/Unit";
import { UnitController } from "../../adapters/unit.controller";
import { GmapMap, GmapMarker } from "@fawmi/vue-google-maps";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

export default defineComponent({
  //Definir Variables de Uso
  data() {
    return {
      unidades: [],
      unit: {
        idgps: 0,
        brand: "",
        model: "",
        plate: "",
        serie: "",
        year: "",
        color: "",
        line: "",
        unit_name: "",
        group_name: "",
      } as Unit,
      showModal: false,
    };
  },
  mounted() {
    //Ejecutar Cuando se cargue la Vista
    this.fetchData();
  },
  methods: {
    //Función de Registro de Datos
    async submitForm() {
      const controller = new UnitController();
      //Envio de Petición
      const resp = await controller.addUnit(this.unit);
      if (resp.result) {
        this.showModal = false;
         Swal.fire({
                title: '¡Registro Éxitoso!',
                text: 'Se ha Guardado en la Base de datos, una unidad',
                icon: 'success',
                confirmButtonText: 'OK',
            });
      }else{
         Swal.fire({
                title: '¡Atención!',
                text: 'Ya hay un dato con ese IDGPS',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
      }
    },
    openAdd() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async fetchData() {
      //Estructura de Peticion
      const url = "https://www.tcvsat.com.mx/tcvback/v3/api/units";
      const headers = {
        "Tcv-Client-Id":
          "N2U5YzQyNzgzMTA4ODFhN2U4YTZjZmNkMzU1Yjg3ZjljNWUxYzNlMDRjYjNlODc0MjRiM2Q2YzRkYjkxMTEzNGEyYjcxMjU2YmFjYjAxMzM5YjM1OWU0NzBjYTgwMjMzODI1M2IxOTY5NjI5M2RlNmQyMTBlZDU1ZDU3N2U3M2IK",
      };

      try {
        const response = await axios.get(url, { headers });
        //Asignar Datos
        this.unidades = response.data;
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    },
  },
  setup() {},
});
</script>

<style scoped>
/* Estilos específicos del componente si es necesario */
.modal {
  display: none;
}
.show {
  display: block;
}

.sectionunit{
  margin-bottom: 3%;
}
</style>