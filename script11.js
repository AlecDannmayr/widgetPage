var fixturesApi = fetch('http://feed.decimalcricket.com/api/match/list', {
   method: 'GET',
   headers: { 'x-api-key': 'decimaltest', 'Content-Type': 'application/json' },
})

window.addEventListener('load', function () {
   var ee = document.getElementById('loading-screen'),
      t = document.getElementById('body-wrapper')
   ;(ee.style.display = 'none'), (t.style.display = 'block')

   fixturesApi
      .then((response) => response.json())
      .then((json) => {
         var r = json.matches,
            cmip = 0,
            nxndc = 0,
            sif,
            gst = r,
            td = new Date(),
            fixlst = document.querySelector('.sidebar-list-fixtures'),
            sift = document.getElementsByClassName('sidebar-item-fixtures')

         r = r.filter(function (obj) {
            return obj.competition !== 'Quantum Cricket League'
         })

         /*
                  let dotw = td.getDay(), dyw;
                  switch (dotw) {
                     case 1:
                        dyw = "Monday"
                        break;
                     case 2:
                        dyw = "Tuesday"
                        break;
                     case 3:
                        dyw = "Wednesday"
                        break;
                     case 4:
                        dyw = "Thursday"
                        break;
                     case 5:
                        dyw = "Friday"
                        break;
                     case 6:
                        dyw = "Saturday"
                        break;
                     case 7:
                        dyw = "Sunday"
                        break;
                  }           
*/

         // Sorts api of fixtures to game starting soonest

         r.sort((a, b) => {
            let da = new Date(a.start),
               db = new Date(b.start)
            return da - db
         })

         // Checks for games Today and outputs as var 'filtered'

         const prep = document.getElementsByClassName('sidebar-item-fixtures-today')
         nxdg = document.createElement('li')
         nxdg.setAttribute('class', 'sidebar-item-fixtures-demo')
         fixlst.append(nxdg)
         const sifxl = document.getElementsByClassName('sidebar-item-fixtures-demo')[1],
            nxdga = document.createElement('a')
         nxdga.setAttribute('class', 'sidebar-anchor-fixtures')
         nxdga.setAttribute('href', '#')
         nxdga.innerHTML = 'Games Today:'
         sifxl.appendChild(nxdga)
         dntat = document.createElement('div')
         dntat.setAttribute('class', 'date-time-demo')
         sifxl.append(dntat)
         const tgdtd = document.getElementsByClassName('date-time-demo')[1]
         nxdgat = document.createElement('p')
         nxdgat.setAttribute('id', 'gmn')
         tgdtd.appendChild(nxdgat)

         // Creates list items and appends to fixtures list for any games live today.

         let moments = moment(),
            nuDt = moments.format().substring(0, 10),
            filtered,
            notf = 0

         //  (moments.format().substring(11, 19), r[2].start.substring(11, 19))

         for (i = 0; i < r.length; i++) {
            if (r[i].start.substring(0, 10) == nuDt) {
               filtered = r[i]
               cmip++
               nA = document.createElement('li')
               nA.setAttribute('class', 'sidebar-item-fixtures')
               fixlst.append(nA)
               sif = document.querySelectorAll('.sidebar-item-fixtures')
               const atr = document.createElement('a')
               atr.setAttribute('class', 'sidebar-anchor-fixtures')
               atr.setAttribute('data', r[i].id)
               atr.setAttribute('href', '#')
               atr.innerHTML = filtered.name.split(' v ').join('<br />').split(',')[0]
               for (let ii = 0; ii < sif.length; ii++) {
                  sif[ii].appendChild(atr)
               }
            }
         }
         for (ii = 0; ii < sif.length; ii++) {
            const adiv = document.createElement('div')
            adiv.setAttribute('class', 'date-time')
            sif[ii].appendChild(adiv)
            const dt = document.querySelectorAll('.date-time')
            at = document.createElement('p')
            at.setAttribute('class', 'fixture-time')

            dt[ii].appendChild(at)
            ad = document.createElement('p')
            ad.setAttribute('class', 'fixture-data')
            ad.innerHTML = filtered.start.split('T')[0].substring(0, 10).split('-').reverse().join('/')
            dt[ii].appendChild(ad)
            sif[ii].style.cssText = 'padding-right: 40px;'
         }
         for (i = 0; i < r.length; i++) {
            if (r[i].start.substring(0, 10) == nuDt) {
               filtered = r[i]
               const fixtime = document.getElementsByClassName('fixture-time')[i]
               // fixtime.innerHTML = filtered.start.split('T')[1].substring(0, 5) + '&nbsp&nbsp'
               console.log(fixtime)
            }
         }

         // Removed first IPL Outright Fixture from list

         // const rmv = document.getElementsByClassName('sidebar-item-fixtures')[0]
         // rmv.parentNode.removeChild(rmv)

         // Display todays game count

         const gmn = document.querySelector('#gmn'),
            nxgn = document.querySelector('#nxgn')
         if (cmip != 0) {
            gmn.innerHTML = '<br>' + cmip
         } else {
            gmn.innerHTML = '<br>No Live Games'
         }
         /*

         if (nxndc != 0) {
            nxgn.innerHTML = '<br>' + nxndc
         } else {
            nxgn.innerHTML = 'No Games Tomorrow'
         }
*/
         // Listens for live games from fixtures and sends game did of game to content window and runs live game socket

         document.addEventListener(
            'click',
            function (event) {
               if (!event.target.matches('.sidebar-anchor-fixtures')) return
               w = document.getElementsByClassName('iFrame')[0]
               idNo = event.target.getAttribute('data')
               event.preventDefault()
               w.contentWindow.matchRun(idNo)
            },
            false
         )

         // Listens for demo selection from fixtures and sends game id of demo to content window and runs demo socket

         document.addEventListener(
            'click',
            function (event) {
               if (!event.target.matches('.sidebar-demo-fixture')) return
               w = document.getElementsByClassName('iFrame')[0]
               w.contentWindow.matchRun('1000004510LIVE1001')
            },
            false
         )
      })
})

let z = document.getElementsByClassName('sidebar')[0]

function o(x) {
   x.classList.toggle('change')
   navSize = z.style.width
   if (navSize == '270px') {
      return close()
   }
   return open()
}

function open() {
   z.style.cssText = 'width: 270px;'
}

function close() {
   z.style.cssText = 'width: 0px;'
}

// Checks for games Tomorrow and outputs as var 'filteredTomorrow'

/*

         let tomorrow = moments.add(1, 'days').format().substring(0, 10)
         function filter_games_tomorrow(r) {
            return r.start == tomorrow
         }
         var filteredTomorrow = r.filter(filter_games_tomorrow)
*/
/*
                              let nuDt = moments.format().substring(0, 10)
                              function filter_games(r) {
                                 return r.start != nuDt;
                              }
                              var filtered = r.filter(filter_games);
               */

// Creates and prepends a demo list item to indicate how many games in day (does not show if no games)
