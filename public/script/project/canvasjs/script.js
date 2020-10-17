
function start() {
  var sonad = document.getElementById('input').value.toLowerCase().split(' ')
  const vowelList = 'aeiouõäöü';
  var vCount = [];
  var cCount = []

  sonad.forEach(sona => {
    const count = sona.split('').filter(x => vowelList.indexOf(x) !== -1).length
    vCount.push({
      y: count,
      label: sona
    })
    cCount.push({
      y: sona.length - count,
      label: sona
    })
  })

  new CanvasJS.Chart('canvas', {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1",
    title: {
      text: 'Täis- ja kaashäälikud'
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "stackedBar100",
      toolTipContent: "{label}<br><b>{name}:</b> {y} (#percent%)",
      showInLegend: true,
      name: "Kaashäälikud",
      dataPoints: cCount
    },
      {
        type: "stackedBar100",
        toolTipContent: "{label}<br><b>{name}:</b> {y} (#percent%)",
        showInLegend: true,
        name: "Täishäälikud",
        dataPoints: vCount
      }
    ]
  }).render()
}