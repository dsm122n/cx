// import * as pdfjsLib from 'pdfjs-dist';
// import 'pdfjs-dist/build/pdf.worker';

class diaExamen {
    constructor(fecha, hora){
        this.fecha = fecha;
        this.hora = hora;
        this.hemograma = {
            Hb: null,
            VCM: null,
            CHCM: null,
            Leucocitos: null,
            Segmentados: null,
            Linfocitos: null,
            Plaquetas: null,
            VHS: null
        };
        this.coagulacion = {
            TP: null,
            INR: null,
            TTPK: null
        };
        this.electrolitos = {
            Na: null,
            K: null,
            Cl: null,
            Ca: null,
            P: null,
            Mg: null
        };
        this.funcionRenal = {
            //Urea: null,
            BUN: null,
            Crea: null,
            AcUrico: null
        };
        this.gases = {
            
            pH: null,
            pCO2: null,
            pO2: null,
            HCO3: null,
            EB: null,
            SatO2: null
        };

        this.funcionHepatica = {
            GOT: null,
            GPT: null,
            GGT: null,
            FA: null,
            BiliT: null,
            BiliD: null,
            Amilasa: null,
            Lipasa: null,
            Proteinas: null,
            Albumina: null
        };


        this.otros = {
            LDH: null,
            PCR: null
        }


    }

}
const nombresExamenes = [
    "Hemoglobina", "VCM", "CHCM", "Recuento Leucocitos", "Segmentados", "Linfocitos", "V.H.S.",
    "INR", "Tiempo de protrombina %", "TTPK",
    "Sodio ( Na )", "Potasio ( K )", "Cloro ( Cl )", "Calcio Ionico", "Fósforo", "Magnesio",
    "Creatinina", "Nitrogeno Ureico", "Acido Urico",
    "pH", "pCO2", "pO2", "HCO3-", "BE (B)", "sO2",
    "ASAT/GOT", "ALAT/GPT", "Gama GT", "Fosfatasas Alcalinas", "Bilirrubina Total", "Bilirrubina Directa", "Amilasa", "Lipasa", "Proteinas Totales", "Albumina",
    "LDH", "PCR"
];

// excecute openLab function when button is clicked



function readLab() {
    console.log("openLab function");
    
    let pdfUrl = document.getElementById("pdfURL").value;
    console.log(typeof(pdfUrl));
    console.log(pdfUrl);
    
    // Asynchronously load the PDF file
    // const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    console.log("loadingTask.promise: \n");
    console.log(loadingTask);
    loadingTask.promise.then(function (pdf) {
      // Initialize an array to hold the text from each page
        let textArray = [];
        console.log("dentro del promise");
        // Iterate through each page of the PDF
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(function (page) {
            // Extract text content from the page
                page.getTextContent().then(function (textContent) {
                    const pageText = [];

                    // Iterate through the text content items
                    for (const item of textContent.items) {
                        pageText.push(item.str);
                    }
                    textArray.push(pageText);
                    
                    // Join the text content from this page into a single string
                    // const pageTextString = pageText.join(" ");
                    console.log("el array de textos es: \n");
                    //console.log(textArray);
                    // copy object to clipboard in json format
                    let jsonString = JSON.stringify(textArray);
                    
                    // console.log(jsonString);
                    // navigator.clipboard.writeText(jsonString);
                    // copy to clipboard

                    
                    return textArray;
                })
                .then(function (textArray) {
                        console.log("el array de textos en el siguiente .then() es: \n");
                        console.log(textArray);
                        console.log(textArray[0].indexOf("Fecha y Hora Ingreso Solicitud :", 0));
                        indice_fecha_hora = textArray[0].indexOf("Fecha y Hora Ingreso Solicitud :", 0)+1;
                        let fecha_hora = textArray[0][indice_fecha_hora].split(" ");
                        console.log(fecha_hora);
                        let labDia = new diaExamen(fecha_hora[0],fecha_hora[1]);
                        console.log("FECHAAAA " + labDia.fecha);
                        console.log("horaaaaa " + labDia.hora);
                        let dateString = labDia.fecha;
                        let [day, month, year] = dateString.split('/');

                        // Ensure the components are in the correct order (DD/MM/YYYY)
                        //let dateObject = new Date(`${month}/${day}/${year}`);
                        //console.log(dateObject);
                        //let timeString = labDia.hora;
                        //let [hours, minutes] = timeString.split(':');
//
                        //// Set the time components to the Date object
                        //dateObject.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                        //labDia.fecha = dateObject;

                        console.log("largo de:" + textArray[0][1].length);

                        for (let i = 0; i < textArray.length; i++) {

                            for (let k = 0; k < textArray[i].length; k++) {
                                for (let j = 0; j < nombresExamenes.length; j++) {
                                    //console.log(textArray[i][k]);
                                    //console.log("i es " + i + ", k es " + k + " y j es " + j);
                                    ////////////// aquí añadir el /\s asterisco antes del /
                                    const elementWithoutSpaces = textArray[i][k].replace(/\s*/, '');
                                    
                        
                                    if (elementWithoutSpaces == nombresExamenes[j]) {
                                        // Check if the element matches the exam name
                                        let valueIndex = k + 2;
                                        if (valueIndex < textArray[i].length) {
                                            console.log("Para el examen " + nombresExamenes[j] + " en la posición " + k + " el valor post es " + textArray[i][valueIndex]);
                                            switch (nombresExamenes[j]) {
                                                case "Hemoglobina":
                                                    labDia.hemograma.Hb = textArray[i][valueIndex];
                                                    break;
                                                case "VCM":
                                                    labDia.hemograma.VCM = textArray[i][valueIndex];
                                                    break;
                                                case "CHCM":
                                                    labDia.hemograma.CHCM = textArray[i][valueIndex];
                                                    break;
                                                case "Recuento Leucocitos":
                                                    labDia.hemograma.Leucocitos = textArray[i][valueIndex] + "0";
                                                    break;
                                                case "Segmentados":
                                                    labDia.hemograma.Segmentados = textArray[i][valueIndex] + "0";
                                                    break;
                                                case "Linfocitos":
                                                    labDia.hemograma.Linfocitos = textArray[i][valueIndex] + "0";
                                                    break; 
                                                case "V.H.S.":
                                                    labDia.hemograma.VHS = textArray[i][valueIndex];
                                                    break;
                                                case "INR":
                                                    labDia.coagulacion.INR = textArray[i][valueIndex];
                                                    break;
                                                case "Tiempo de protrombina %":
                                                    // add unit of measurement "%" at the end
                                                    labDia.coagulacion.TP = textArray[i][valueIndex] + "%";

                                                    break;
                                                case "TTPK":
                                                    labDia.coagulacion.TTPK = textArray[i][valueIndex];
                                                    break;
                                                case "Sodio ( Na )":
                                                    labDia.electrolitos.Na = textArray[i][valueIndex];
                                                    break;
                                                case "Potasio ( K )":
                                                    labDia.electrolitos.K = textArray[i][valueIndex];
                                                    break;
                                                case "Cloro ( Cl )":
                                                    labDia.electrolitos.Cl = textArray[i][valueIndex];
                                                    break;
                                                case "Calcio Ionico":
                                                    labDia.electrolitos.Ca = textArray[i][valueIndex];
                                                    break;
                                                case "Fósforo":
                                                    labDia.electrolitos.P = textArray[i][valueIndex];
                                                    break;
                                                case "Magnesio":
                                                    labDia.electrolitos.Mg = textArray[i][valueIndex];
                                                    break;
                                                case "Creatinina":
                                                    labDia.funcionRenal.Crea = textArray[i][valueIndex];
                                                    break;
                                                case "Nitrogeno Ureico":
                                                    labDia.funcionRenal.BUN = textArray[i][valueIndex];
                                                    break;
                                                case "Acido Urico":
                                                    labDia.funcionRenal.AcUrico = textArray[i][valueIndex];
                                                    break;
                                                case "pH":
                                                    labDia.gases.pH = textArray[i][valueIndex];
                                                    break;
                                                case "pCO2":
                                                    labDia.gases.pCO2 = textArray[i][valueIndex];
                                                    break;
                                                case "pO2":
                                                    labDia.gases.pO2 = textArray[i][valueIndex];
                                                    break;
                                                case "HCO3-":
                                                    labDia.gases.HCO3 = textArray[i][valueIndex];
                                                    break;
                                                case "BE (B)":
                                                    labDia.gases.EB = textArray[i][valueIndex];
                                                    break;
                                                case "sO2":
                                                    labDia.gases.SatO2 = textArray[i][valueIndex] + "%";
                                                    break;
                                                case "ASAT/GOT":
                                                    labDia.funcionHepatica.GOT = textArray[i][valueIndex];
                                                    break;
                                                case "ALAT/GPT":
                                                    labDia.funcionHepatica.GPT = textArray[i][valueIndex];
                                                    break;
                                                case "Gama GT":
                                                    labDia.funcionHepatica.GGT = textArray[i][valueIndex];
                                                    break;
                                                case "Fosfatasas Alcalinas":
                                                    labDia.funcionHepatica.FA = textArray[i][valueIndex];
                                                    break;
                                                case "Bilirrubina Total":
                                                    labDia.funcionHepatica.BiliT = textArray[i][valueIndex];
                                                    break;  
                                                case "Bilirrubina Directa":
                                                    labDia.funcionHepatica.BiliD = textArray[i][valueIndex];
                                                    break;
                                                case "Amilasa":
                                                    labDia.funcionHepatica.Amilasa = textArray[i][valueIndex];
                                                    break;
                                                case "Lipasa":
                                                    labDia.funcionHepatica.Lipasa = textArray[i][valueIndex];
                                                    break;
                                                case "Proteinas Totales":
                                                    labDia.funcionHepatica.Proteinas = textArray[i][valueIndex];
                                                    break;
                                                case "Albumina":
                                                    labDia.funcionHepatica.Albumina = textArray[i][valueIndex];
                                                    break;
                                                case "LDH":
                                                    labDia.otros.LDH = textArray[i][valueIndex];
                                                    break;
                                                case "PCR":
                                                    labDia.otros.PCR = textArray[i][valueIndex];
                                                    break;
                                                default:
                                                    break;
                                            }
                                        } else {
                                            console.log("No se encontró el valor posterior para el examen " + nombresExamenes[j] + " en la posición " + k);
                                        }
                                        // break;  // Exit the loop once the element is found
                                    }
                                }
                            }

                            
                            console.log(labDia);
                        }
                        console.log(labDia);
                        // creat div with the results inside div id primera
                        // let div = document.createElement('div');
                        // div.id = 'resultados';
                        // div.innerHTML = ´>${labDia.fecha.getDay()}/}
                        // document.getElementById('primera').appendChild(div);

                            
                            // function formatSection(title, data) {
                            //   // if data === null, return empty string
                            //   
                            //   const items = Object.entries(data).map(([key, value]) => `${key} ${value}`).join(', ');
                            //   return `- ${title} ${items}`;
                            // }
                        function formatSection(title, data) {
                            // If data is null or an empty object, return empty string
                            if (data === null || Object.keys(data).length === 0) {
                                return '';
                            }
                            
                            // Filter out entries with null values
                            const filteredEntries = Object.entries(data).filter(([key, value]) => value !== null);
                            
                            // Convert filtered entries to an array of strings
                            
                            const items = filteredEntries.map(([key, value]) => `${key}${value}`).join('   ');
                            
                            // Return the formatted section
                            return `- ${title}: ${items}`;
                        }
                        // const formattedDate = formatDate(new Date(labDia.fecha));
                        // const formattedTime = formatTime(labDia.hora);
                        let examenesStringsArray = [];
                        examenesStringsArray.push(formatSection('Hemograma', labDia.hemograma));
                        examenesStringsArray.push(formatSection('Gases', labDia.gases));
                        examenesStringsArray.push(formatSection('Función Renal', labDia.funcionRenal));
                        examenesStringsArray.push(formatSection('Electrolitos', labDia.electrolitos));
                        examenesStringsArray.push(formatSection('Función Hepática', labDia.funcionHepatica));
                        examenesStringsArray.push(formatSection('Coagulación', labDia.coagulacion));
                        examenesStringsArray.push(formatSection('Otros', labDia.otros));
                        
                        let finalString = `>${labDia.fecha} ${labDia.hora}:`;
                        //\n  ${hemogramaStr}\n  ${gasesStr}\n  ${funcionRenalStr}\n  ${electrolitosStr}`;
                        for (let i = 0; i < examenesStringsArray.length; i++) {
                            const element = examenesStringsArray[i];
                            finalString += `\n ${element}`;
                        }
                        
                        
                        document.getElementById('labText').textContent = finalString + "\n" ;
                        // select text from text outputDiv and copy to clipboard
                        // document.getElementById('outputDiv').select();
                    
                })
                .catch(function (error) {
                    console.log("Error: " + error);
                });
                ;
            });
        }
        
    });
};
