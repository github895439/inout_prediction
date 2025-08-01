function buttonHowListener(params) {
    alert("\
基本、収入、支出を入力し、「予測」ボタンを押すと予測下に予測が表示される。\n\
\n\
入力後、「SAVE」ボタンを押すと、入力値が「保存データ」にcsvでまとめられる。\n\
「保存データ」にデータがある状態で「LOAD」ボタンを押すと、「保存データ」を入力に反映させる。\n\
\n\
補足:\n\
収入、支出の要素は固定ではなく、保存データの内容によって可変にできる。\n\
保存データのフォーマットは、1行目は基本、2行目から空行まで収入、残りが支出なので、フォーマットを守って行を追加すれば要素を増減できる。\n\
「保存データ」をコピペでファイル等に残しておけば、それをまたコピペして内容を復元できる。\
");
    return;
}

function buttonSaveListener(params) {
    if (textSaveData.value != "") {
        if (!confirm("保存データを消してよいですか？")) {
            return;
        }

        textSaveData.value = "";
    }

    let lineBasic = [
        textAgeStart.value,
        textAgeEnd.value,
        textWorkEnd.value,
        textPensionStart.value
    ].join(",");
    textSaveData.value += (lineBasic + "\n");
    let textIn = document.querySelectorAll("input[id^=textIn]");

    for (let index = 0; index < textIn.length; index++) {
        let dependInInnerText = document.querySelector(`#dependIn_${index}`).innerText;
        let line = [
            document.querySelector(`#nameIn_${index}`).innerText,
            document.querySelector(`#textIn_${index}`).value,
            document.forms[0][`radioIn_${index}`].value,
            dependInInnerText == undefined ? "" : dependInInnerText,
        ]
        textSaveData.value += (line + "\n");
    }

    textSaveData.value += "\n";
    let textOut = document.querySelectorAll("input[id^=textOut]");

    for (let index = 0; index < textOut.length; index++) {
        let dependOutInnerText = document.querySelector(`#dependOut_${index}`).innerText;
        let line = [
            document.querySelector(`#nameOut_${index}`).innerText,
            document.querySelector(`#textOut_${index}`).value,
            document.forms[0][`radioOut_${index}`].value,
            dependOutInnerText == undefined ? "" : dependOutInnerText,
        ]
        textSaveData.value += (line + "\n");
    }

    return;
}

function clear() {
    moneyIn.innerHTML = "";
    moneyOut.innerHTML = "";
    let eleInputTexts = document.querySelectorAll("input[type=text]");

    for (const eleInputText of eleInputTexts) {
        eleInputText.value = "";
    }

    clearCommon();
    return;
}

function clearCommon(params) {
    predDetail.innerHTML = "";
    document.querySelector("#textPredDeposit").innerText = "";
    return;
}

function buttonLoadListener(params) {
    if (textSaveData.value == "") {
        return;
    }

    if ((document.querySelector("#nameIn_0") != undefined) && (!confirm("入力データと予測を消してよいですか？"))) {
        return;
    }

    clear();
    let lineSaveDatas = textSaveData.value.split("\n");
    [
        textAgeStart.value,
        textAgeEnd.value,
        textWorkEnd.value,
        textPensionStart.value
    ] = lineSaveDatas[0].split(",");

    let offset;
    let indexLine = 1;
    let radioIns = [];
    offset = 0;

    while (lineSaveDatas[indexLine + offset] != "") {
        let inputs = lineSaveDatas[indexLine + offset].split(",");
        radioIns.push(inputs[2]);
        let eleTdName = document.createElement("td");
        eleTdName.setAttribute("id", `nameIn_${offset}`);
        eleTdName.setAttribute("class", "maked");
        eleTdName.innerText = inputs[0];
        let eleTdMonth = document.createElement("td");
        eleTdMonth.setAttribute("id", `textMonthIn_${offset}`);
        eleTdMonth.setAttribute("class", "maked");
        eleTdMonth.innerText = `${inputs[1] == "" ? "" : Math.floor(inputs[1] / inputs[2])}`;
        let eleTdInput = document.createElement("td");
        eleTdInput.setAttribute("class", "maked");
        eleTdInput.innerHTML = `\
            <input type="text" id="textIn_${offset}" value="${inputs[1]}" size="7"></input><br>\
            <input type="radio" name="radioIn_${offset}" value="1" checked>月額</input>\
            <input type="radio" name="radioIn_${offset}" value="2">隔月</input>\
            <input type="radio" name="radioIn_${offset}" value="6">半年</input>\
            <input type="radio" name="radioIn_${offset}" value="12">年額</input>\
            <input type="radio" name="radioIn_${offset}" value="24">隔年</input>
        `;
        let eleTdDepend = document.createElement("td");
        eleTdDepend.setAttribute("id", `dependIn_${offset}`);
        eleTdDepend.setAttribute("class", "maked");
        eleTdDepend.innerText = inputs[3];
        let eleTr = document.createElement("tr");
        eleTr.setAttribute("valign", "top");
        eleTr.appendChild(eleTdName);
        eleTr.appendChild(eleTdMonth);
        eleTr.appendChild(eleTdInput);
        eleTr.appendChild(eleTdDepend);
        moneyIn.appendChild(eleTr);
        offset++;
    }

    let countIn = offset;
    indexLine += offset;
    indexLine++;
    let radioOuts = [];
    offset = 0;

    while ((lineSaveDatas[indexLine + offset] != undefined) && (lineSaveDatas[indexLine + offset] != "")) {
        let inputs = lineSaveDatas[indexLine + offset].split(",");
        radioOuts.push(inputs[2]);
        let eleTdName = document.createElement("td");
        eleTdName.setAttribute("id", `nameOut_${offset}`);
        eleTdName.setAttribute("class", "maked");
        eleTdName.innerText = inputs[0];
        let eleTdMonth = document.createElement("td");
        eleTdMonth.setAttribute("id", `textMonthOut_${offset}`);
        eleTdMonth.setAttribute("class", "maked");
        eleTdMonth.innerText = `${inputs[1] == "" ? "" : Math.floor(inputs[1] / inputs[2])}`;
        let eleTdInput = document.createElement("td");
        eleTdInput.setAttribute("class", "maked");
        eleTdInput.innerHTML = `\
            <input type="text" id="textOut_${offset}" value="${inputs[1]}" size="7"></input><br>\
            <input type="radio" name="radioOut_${offset}" value="1" checked>月額</input>\
            <input type="radio" name="radioOut_${offset}" value="2">隔月</input>\
            <input type="radio" name="radioOut_${offset}" value="6">半年</input>\
            <input type="radio" name="radioOut_${offset}" value="12">年額</input>\
            <input type="radio" name="radioOut_${offset}" value="24">隔年</input>
        `;
        let eleTdDepend = document.createElement("td");
        eleTdDepend.setAttribute("id", `dependOut_${offset}`);
        eleTdDepend.setAttribute("class", "maked");
        eleTdDepend.innerText = inputs[3];
        let eleTr = document.createElement("tr");
        eleTr.setAttribute("valign", "top");
        eleTr.appendChild(eleTdName);
        eleTr.appendChild(eleTdMonth);
        eleTr.appendChild(eleTdInput);
        eleTr.appendChild(eleTdDepend);
        moneyOut.appendChild(eleTr);
        offset++;
    }

    let countOut = offset;

    for (let index = 0; index < countIn; index++) {
        document.forms[0][`radioIn_${index}`].value = radioIns[index];
    }

    for (let index = 0; index < countOut; index++) {
        document.forms[0][`radioOut_${index}`].value = radioOuts[index];
    }

    return;
}

function buttonPredListener(params) {
    if ((document.querySelector("#textPredDeposit").innerText != "") && (!confirm("予測を消してよいですか？"))) {
        return;
    }

    clearCommon();

    if ((textAgeStart.value == "") || (textAgeEnd.value == "")) {
        alert("予測期間を入力して下さい。");
        return;
    }

    for (const textIn of document.querySelectorAll("input[id^=textIn")) {
        let number = textIn.id.split("_")[1];

        if (textIn.value == "") {
            document.querySelector(`#textMonthIn_${number}`).innerText = "";
            continue;
        }

        let value1 = textIn.value;
        let value2 = document.forms[0][`radioIn_${number}`].value;
        document.querySelector(`#textMonthIn_${number}`).innerText = Math.floor(value1 / value2);
    }

    for (const textOut of document.querySelectorAll("input[id^=textOut")) {
        let number = textOut.id.split("_")[1];

        if (textOut.value == "") {
            document.querySelector(`#textMonthOut_${number}`).innerText = "";
            continue;
        }

        let value1 = textOut.value;
        let value2 = document.forms[0][`radioOut_${number}`].value;
        document.querySelector(`#textMonthOut_${number}`).innerText = Math.floor(value1 / value2);
    }

    let textMonthAll = 0;

    for (let indexMonth = 0; indexMonth < (textAgeEnd.value - textAgeStart.value) * 12; indexMonth++) {
        let textMonth = 0;
        let textMonthIns = document.querySelectorAll("td[id^=textMonthIn]");
        let age = Number(textAgeStart.value) + Math.floor(indexMonth / 12);

        for (const textMonthIn of textMonthIns) {
            let number = textMonthIn.id.split("_")[1];
            let dependIn = document.querySelector(`#dependIn_${number}`);

            if (dependIn.innerText != "") {
                switch (dependIn.innerText) {
                    case "年金給付開始": {
                        if (age < Number(textPensionStart.value)) {
                            continue;
                        }

                        break;
                    }
                    case "定年": {
                        if (age > Number(textWorkEnd.value)) {
                            continue;
                        }

                        break;
                    }
                    default:
                        break;
                }
            }

            textMonth += Number(textMonthIn.innerText);
        }

        let textMonthOuts = document.querySelectorAll("td[id^=textMonthOut]");

        for (const textMonthOut of textMonthOuts) {
            let number = textMonthOut.id.split("_")[1];
            let dependOut = document.querySelector(`#dependOut_${number}`);

            if (dependOut.innerText == "") {
                textMonth -= Number(textMonthOut.innerText);
            } else {
                //###
            }
        }

        textMonthAll += textMonth;
        let eleTdAge = document.createElement("td");
        eleTdAge.setAttribute("class", "maked");
        eleTdAge.innerText = age;
        let eleTdMonth = document.createElement("td");
        eleTdMonth.setAttribute("class", "maked");
        eleTdMonth.innerText = indexMonth % 12 + 1;
        let eleTdInOut = document.createElement("td");
        eleTdInOut.setAttribute("class", "maked");
        eleTdInOut.innerText = textMonth;
        let eleTdInputAll = document.createElement("td");
        eleTdInputAll.setAttribute("class", "maked");
        eleTdInputAll.innerText = textMonthAll;
        let eleTr = document.createElement("tr");
        eleTr.setAttribute("valign", "top");
        eleTr.appendChild(eleTdAge);
        eleTr.appendChild(eleTdMonth);
        eleTr.appendChild(eleTdInOut);
        eleTr.appendChild(eleTdInputAll);
        predDetail.appendChild(eleTr);
    }

    document.querySelector("#textPredDeposit").innerText = textMonthAll * -1;
    return;
}

function bbuttonInitListener(params) {
    if ((textSaveData.value != "") && (!confirm("初期化してよいですか？"))) {
        return;
    }

    textSaveData.value = "";
    clear();
    return;
}

[
    buttonHow,
    buttonSave,
    buttonLoad,
    buttonInit,
    buttonPred,
    textSaveData,
    textAgeStart,
    textAgeEnd,
    textWorkEnd,
    textPensionStart,
    moneyIn,
    moneyOut,
    predDetail
] = [
        document.querySelector("#buttonHow"),
        document.querySelector("#buttonSave"),
        document.querySelector("#buttonLoad"),
        document.querySelector("#buttonInit"),
        document.querySelector("#buttonPred"),
        document.querySelector("#textSaveData"),
        document.querySelector("#textAgeStart"),
        document.querySelector("#textAgeEnd"),
        document.querySelector("#textWorkEnd"),
        document.querySelector("#textPensionStart"),
        document.querySelector("#moneyIn"),
        document.querySelector("#moneyOut"),
        document.querySelector("#predDetail")
    ];
buttonHow.addEventListener("click", buttonHowListener);
buttonSave.addEventListener("click", buttonSaveListener);
buttonLoad.addEventListener("click", buttonLoadListener);
buttonInit.addEventListener("click", bbuttonInitListener);
buttonPred.addEventListener("click", buttonPredListener);
buttonLoadListener();
