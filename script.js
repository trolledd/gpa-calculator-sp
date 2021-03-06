var noOfSemModules = []
var calOverallGPA = {}

function getThisSemCumGPA(sem) {
  let moduleCount = $(`[id^=S${sem}M]`).length;

  let MCU = 0, semModuleSum = 0;
  let lastModuleCount = $(`[id^=S${sem}M]`)[moduleCount-1]

  if(lastModuleCount != undefined){
    let lastModuleCountID = lastModuleCount.id;
    let lastModuleCountIDNum = lastModuleCountID.substring(lastModuleCountID.indexOf("M") + 1)
    for(let i = 0; i < lastModuleCountIDNum; i++){
      if($(`#S${sem}M${i+1}`).text() != ""){
        MCU += parseFloat($(`#S${sem}M${i+1}`).text().split(" ")[2]);
        semModuleSum += parseFloat($(`#S${sem}M${i+1}`).text().split(" ")[4]);
      }
    }
  }

  semGPA = semModuleSum/MCU;

  if(Number.isNaN(semGPA)){
    semGPA = 0;
    semGPA = semGPA.toFixed(2);
  }

  /* if((sem in calOverallGPA) == false){
    console.log("sem is not created")
  // console.log(jQuery.isEmptyObject(calOverallGPA[1]))
  } */

  calOverallGPA[sem] = {'semModuleSum': semModuleSum, 'MCU': MCU}
  updateOverallGPA();

  document.getElementById(`TotalS${sem}`).innerHTML = `<hr>${semModuleSum} / ${MCU} = ${semGPA}<hr>`;
  document.getElementById(`cumGPA${sem}`).innerHTML = semGPA;
}

function updateOverallGPA(){
  var overallModuleSum = 0, overallMCU = 0;
  for(let i = 0; i < Object.keys(calOverallGPA).length; i++){
  // console.log(Object.keys(calOverallGPA)[i]);
  overallModuleSum += calOverallGPA[Object.keys(calOverallGPA)[i]]['semModuleSum']
  overallMCU += calOverallGPA[Object.keys(calOverallGPA)[i]]['MCU']
  }

  overallGPA = overallModuleSum/overallMCU

  if(Number.isNaN(overallGPA)){
    overallGPA = 0;
    overallGPA = overallGPA.toFixed(2);
  }

  document.getElementById(`overallGPA`).innerHTML = overallGPA;
}

function updateGPA(sem, module) {
  var gradeInput = document.getElementById(`S${sem}G${module}`);
  var creditInput = document.getElementById(`S${sem}C${module}`).value
  var selectedValue = gradeInput.options[gradeInput.selectedIndex].value;

  if (selectedValue != "Grade" && creditInput != "") {
    moduleSum = selectedValue * creditInput

    if ($(`#S${sem}M${module}`).length >= 1) {
      $(`#S${sem}M${module}`).empty()
      $(`#S${sem}M${module}`).html(`${selectedValue} * ${creditInput} = ${moduleSum}`)
    } else {

      if ($(`#S${sem}M${module + 1}`).length >= 1) {
        $(`#S${sem}M${module + 1}`).before(`<p id="S${sem}M${module}">${selectedValue} * ${creditInput} = ${moduleSum}</p>`)
      }else{
      $(`#S${sem}`).append(`<p id="S${sem}M${module}">${selectedValue} * ${creditInput} = ${moduleSum}</p>`)
      }
    }
    getThisSemCumGPA(sem)
  } else {
    $(`#S${sem}M${module}`).empty()
    getThisSemCumGPA(sem)
  }
  // gradeVal = $(`#S${sem}G${module}`).value;
}

function hideCal(semNo){
  document.getElementById(`S${semNo}`).style.display = "none";
  document.getElementById(`TotalS${semNo}`).style.display = "none";

  $(`#BtnS${semNo}`).remove()
  $(`#Append${semNo}`).append(`
  <button type="submit" class="btn btn-outline-info" onclick="showCal(${semNo})" id="BtnS${semNo}">Show Details</button>
  `)
}


function showCal(semNo){
  document.getElementById(`S${semNo}`).style.display = "block";
  document.getElementById(`TotalS${semNo}`).style.display = "block";

  $(`#BtnS${semNo}`).remove()
  $(`#Append${semNo}`).append(`
  <button type="submit" class="btn btn-outline-warning" onclick="hideCal(${semNo})" id="BtnS${semNo}">Hide Details</button>
  `)
}

function addModule(semNo) {
  count = $(`#Sem${semNo} div.row`).length
  addedCount = count + 1
  noOfSemModules[semNo - 1] = addedCount
  $(`#Sem${semNo}`).append(
    ` <div class="row">
        <div class="col-sm">
            <input type="" class="form-control" id="S${semNo}N${addedCount}" placeholder="Module Name (Optional)">
          </div>
          <div class="col-sm">
            <select class="form-control dropdown-toggle" id="S${semNo}G${addedCount}" onchange="updateGPA(${semNo}, ${addedCount})">
                <option selected>Grade</option>
                <option value="4">A</option>
                <option value="3.5">B+</option>
                <option value="3">B</option>
                <option value="2.5">C+</option>
                <option value="2">C+</option>
                <option value="1.5">D+</option>
                <option value="1.0">D</option>
                <option value="0.5">D-</option>
                <option value="0.5">P</option>
              </select>
          </div>

          <div class="col-sm">
            <input type="number" class="form-control" id="S${semNo}C${addedCount}" placeholder="Credits" oninput="updateGPA(${semNo}, ${addedCount})">
          </div>
       </div>
       <hr>`
  )
}

function addMultipleModule(semNo, count){
  for(let i = 0; i < count; i++){
    addModule(semNo);
  }
}

function addSemester() {
  currentSem = $(`.border.border-primary.rounded`).length + 1
  $(`#div${currentSem - 1}`).after(`
    <div class="border border-primary rounded" id="div${currentSem}">
                <h3>Semester ${currentSem}</h3>
                <form id="Sem${currentSem}">
                   <div class="row">
                    <div class="col-sm">
                        <input type="" class="form-control" id="S${currentSem}N1" placeholder="Module Name (Optional)">
                      </div>
                      <div class="col-sm">
                        <select class="form-control dropdown-toggle" id="S${currentSem}G1" onchange="updateGPA(${currentSem}, 1)">
                            <option selected>Grade</option>
                            <option value="4">A</option>
                            <option value="3.5">B+</option>
                            <option value="3">B</option>
                            <option value="2.5">C+</option>
                            <option value="2">C-</option>
                            <option value="1.5">D+</option>
                            <option value="1.0">D</option>
                            <option value="0.5">D-</option>
                            <option value="0.5">P</option>
                          </select>
                       
                      </div>
                      <div class="col-sm">
                        <input type="number" class="form-control" id="S${currentSem}C1" placeholder="Credits" oninput="updateGPA(${currentSem}, 1)">
                      </div>
                   </div>
                   <hr>
                  </form>
                  <div class="pb-2">
                    <div class="row">
                        <div class="col-sm-6 pr-0" id="S${currentSem}">
                            <b>Calculate:</b>
                            <p>Grade Point * Credit Unit = Grade Point For Module</p>
                        </div>
                        <div id="TotalS${currentSem}"> 
                        </div>
                    </div>
                </div>
                  <div class="pb-2" id="Append${currentSem}"> 
                    <div class="row">
                        <div class="col-sm-2 pr-0">
                            <b>Semester ${currentSem} GPA:</b>
                        </div>
                        <div class="col-sm-1">
                            <p id="cumGPA${currentSem}">0.00</p>
                        </div>
                    </div>

                      <button type="submit" class="btn btn-outline-primary" onclick="addModule(${currentSem})">Add 1 Module</button>
                      <button type="submit" class="btn btn-outline-warning" onclick="hideCal(${currentSem})" id="BtnS${currentSem}">Hide Details</button>
                  </div> 

                  <div class="row">
                    <div class="col-3">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="No. of Modules to add" aria-label="No. of Modules to add" aria-describedby="button-addon2" id="moduleCount${currentSem}">
                            <button class="btn btn-outline-secondary" type="button" onclick="addMultipleModule(${currentSem}, document.getElementById('moduleCount${currentSem}').value)">Add</button>
                          </div>
                    </div>
                </div>
            </div>
    `)
}