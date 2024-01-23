<template>
  <div class="p-4">
    <div class="sectionunit">
      <h2 style="float: left; margin: 4px 0px">Reporte de Unidades</h2>
      <!-- Sección año -->
      <input
        type="number"
        v-model="unitdto.startdate"
        placeholder="Año Inicio"
      />
      <input type="number" v-model="unitdto.enddate" placeholder="Año Fin" />

      <button class="btn btn-outline-dark" @click="submitForm">
        Enviar Solicitud
      </button>
    </div>

    <!-- Botón para realizar la solicitud -->
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
          <td>{{ unidad.idgps }}</td>
          <td>{{ unidad.brand }}</td>
          <td>{{ unidad.model }}</td>
          <td>{{ unidad.plate }}</td>
          <td>{{ unidad.serie }}</td>
          <td>{{ unidad.year }}</td>
          <td>{{ unidad.color }}</td>
          <td>{{ unidad.line }}</td>
          <td>{{ unidad.unit_name }}</td>
          <td>{{ unidad.group_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
//Agregar Dependencias
import Vue from "vue";
import { defineComponent } from "vue";
import axios from "axios";
import { Unit } from "../../entities/Unit";

import { ConsultUnit } from "../../adapters/dtos/UnitDtos";
import { UnitController } from "../../adapters/unit.controller";
import Swal from "sweetalert2";

export default defineComponent({
    //Definir Variables a usar
  data() {
    return {
      unidades: [],
      unitdto: {
        startdate: 0,
        enddate: 0,
      },
    };
  },
  mounted() {},
  methods: {
    async submitForm() {
    //Instancia del Controller
      const controller = new UnitController();
      const resp = await controller.getUnits(this.unitdto);
      //Asignar Datos de Peticion
      this.unidades = resp.entities;

      if (resp.result) {
        if (resp.entities.length === 0) {
          Swal.fire({
            title: "¡Alerta!",
            text: "Ingresa un rango de Años correcto",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
      }
    },
  },
  setup() {},
});
</script>

<style scoped>
.sectionunit {
  margin-bottom: 3%;
}
</style>