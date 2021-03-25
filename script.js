/* document.addEventListener('input',function(e){
  console.log(e)
  if(e.target && e.target.id== 'brnPrepend'){
        //do something
   }
}); */
var noOfSemModules = []

function getThisSemCumGPA(sem) {
  let moduleCount = $(`[id^=S${sem}M]`).length;
  let lastModuleCountID = $(`[id^=S${sem}M]`)[moduleCount-1].id;
  let lastModuleCountIDNum = lastModuleCountID.substring(lastModuleCountID.indexOf("M") + 1)
  let MCU = 0, semModuleSum = 0;
  for(let i = 0; i < lastModuleCountIDNum; i++){
    if($(`#S${sem}M${i+1}`).text() != ""){
      MCU += parseFloat($(`#S${sem}M${i+1}`).text().split(" ")[2]);
      semModuleSum += parseFloat($(`#S${sem}M${i+1}`).text().split(" ")[4]);
    }
  }
  semGPA = semModuleSum/MCU;
  document.getElementById(`cumGPA${sem}`).innerHTML = semGPA
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
                        <div class="col-sm-3 pr-0" id="S${currentSem}">
                            <b>Calculate:</b>
                            <p>Grade Point * Credit Unit</p>
                        </div>
                        
                    </div>
                </div>
                  <div class="pb-2"> 
                    <div class="row">
                        <div class="col-sm-2 pr-0">
                            <b>Semester ${currentSem} GPA:</b>
                        </div>
                        <div class="col-sm-1">
                            <p id="cumGPA${currentSem}">0.00</p>
                        </div>
                    </div>

                      <button type="submit" class="btn btn-primary" onclick="addModule(${currentSem}, 2)">Add Module</button>
                  </div> 
            </div>
    `)
}