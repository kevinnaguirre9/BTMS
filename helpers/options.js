module.exports = {
     formate: 'A4',
     orientation: 'landscape',
     border: '10mm',
     header: {
         height: '15mm',
         contents: '<h4 style=" color: red;font-size:30;text-align:center;font-weight: 900;">Mediciones de temperatura corporal</h4>'
     },
     footer: {
         height: '20mm',
         contents: {
             first: 'Sistema de Mediciones de Temperatura Corporal',
             2: 'Second page',
             default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', 
             last: 'Last Page'
         }
     }
 }