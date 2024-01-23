<template>
  <div class="p-4">
    <h2>Lista de Eventos</h2>
    <div>
      <!-- Componente de selección de fecha y hora -->
      <input type="datetime-local" v-model="selectedDate" />
      <input type="datetime-local" v-model="selectedDatefin" />

      <!-- Componente de entrada de texto para el ID -->
      <input type="text" v-model="idGps" placeholder="Ingrese el ID GPS" />

      <!-- Botón para realizar la solicitud -->
      <button class="btn btn-outline-dark" @click="sendRequest">Enviar Solicitud</button>
    </div>

    <br>
   <table
      responsive
      style="width: 100%"
      class="table table-hover overflow: scroll;"
    >
    <thead class="table-dark">
        <tr>
          <th scope="col" style="width: 200px">ESTATUS UNIDAD</th>
          <th scope="col" style="width: 200px">ESTATUS MOTOR</th>
          <th scope="col" style="width: 200px">LAT</th>
          <th scope="col" style="width: 200px">LON</th>
          <th scope="col" style="width: 200px">DISPOSITIVO</th>
          <th scope="col" style="width: 200px">IMEI</th>
          <th scope="col" style="width: 200px">FECHA</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(unidad, index) in unidades" :key="index">
          <td>{{ unidad.DESC_MSG }}</td>
          <td>{{ unidad.IGNICION }}</td>
          <td>{{ unidad.LAT }}</td>
          <td>{{ unidad.LON }}</td>
          <td>{{ unidad.NAME_DEVICE }}</td>
          <td>{{ unidad.IMEI }}</td>
          <td>{{ unidad.DT_MSG }}</td>
        </tr>
      </tbody>
    </table>

    <GMapMap
      :center="center"
      :zoom="zoomdata"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
    >
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
      >
        <GMapInfoWindow>
          <div>
            <p>IMEI: {{ m.imei }}</p>
          </div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
   
  </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { defineComponent } from "vue";
import axios from "axios";
import { GMapMap, GMapCluster, GMapMarker } from '@fawmi/vue-google-maps';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

interface MapMarker {
  position: { lat: number; lng: number };
  name: string;
  imei: string;
  location: string;
  // Agrega más propiedades según tus necesidades
}
export default defineComponent({
  
  name: "App",
   components: {
    GMapMap,
    GMapCluster,
    GMapMarker,
  },
  data() {
    return {
      unidades: [],
      selectedDate: "",
      selectedDatefin: "",
      idGps: "",
      center: { lat: 19.458077, lng: -99.12991199999999 },
      zoomdata: 12,
      markers: [] as MapMarker[],
    };
  },
  mounted() {},
  methods: {
    /*async fetchData() {
      const url = "https://www.tcvsat.com.mx/tcvback/v3/api/units";
      const headers = {
        "Tcv-Client-Id":
          "N2U5YzQyNzgzMTA4ODFhN2U4YTZjZmNkMzU1Yjg3ZjljNWUxYzNlMDRjYjNlODc0MjRiM2Q2YzRkYjkxMTEzNGEyYjcxMjU2YmFjYjAxMzM5YjM1OWU0NzBjYTgwMjMzODI1M2IxOTY5NjI5M2RlNmQyMTBlZDU1ZDU3N2U3M2IK",
      };

      try {
        const response = await axios.get(url, { headers });
        this.unidades = response.data;
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    },*/
    async sendRequest() {
      try {
        const url = "https://www.tcvsat.com.mx/tcvback/v3/api/events";
        //Agregar Valor seleccionado
        const dtini = this.selectedDate;
        const dtfin = this.selectedDatefin;
        const idgps = parseInt(this.idGps);
        const headers = {
          "Tcv-Client-Id":
            "N2U5YzQyNzgzMTA4ODFhN2U4YTZjZmNkMzU1Yjg3ZjljNWUxYzNlMDRjYjNlODc0MjRiM2Q2YzRkYjkxMTEzNGEyYjcxMjU2YmFjYjAxMzM5YjM1OWU0NzBjYTgwMjMzODI1M2IxOTY5NjI5M2RlNmQyMTBlZDU1ZDU3N2U3M2IK",
        };
        const params = {
          dtini,
          dtfin,
          idgps,
        };

        const response = await axios.get(url, { headers, params });
        this.unidades = response.data;
        if(response.data.length >5){
          this.zoomdata = 15;
        }else{
          this.zoomdata = 12;
        }
        
        this.markers = response.data.map((item: any) => ({
          position: { lat: item.LAT, lng: item.LON },
          name: item.NAME_DEVICE,
          imei: item.IMEI,
          location: item.UBICACION,
        }));
        
      } catch (error) {
         Swal.fire({
                title: '¡Atención!',
                text: 'Ingresa Datos correctos',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
      }
    },
  },
  setup() {},
});
</script>
