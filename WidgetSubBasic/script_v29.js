// Uncomment to use demo widget without menu.
// Switch Iframe to online version to use online and local version to use localy

let socket = new WebSocket('ws://demo-feed-widget-uat.decimalcricket.com/DEMO:Wi')
//var socket = 0 /*remove commenting for socket = 0 and comment out socket.open below when intergrated into menu */

socket.onopen = function () {
   socket.send(
      `{
                                        "msg_type":"feed_subscription",
                                        "feed_id":"1000007310LIVE1001",
                                        "feed_filter":["event", "powerbar", "scorecard", "scoreboard", "lineups", "commentary", "match_update", "scoregrid", "alerts"]
                                      }`
   )
}

//* Global scoped variables (not ideal but is a must for the way the data is structured) */

let g2h = document.getElementById('second-header'),
   mtin = document.getElementById('third-header-game-info'),
   cmli = document.getElementById('comms-list'),
   gsb = document.getElementById('score-body'),
   pb = document.getElementById('win-probability-done'),
   snc1 = document.getElementById('team-one-title-name'),
   snc2 = document.getElementById('team-two-title-name'),
   st1 = document.getElementById('selection-team-one'),
   st2 = document.getElementById('selection-team-two'),
   st1t = document.getElementById('selection-team-one-teams'),
   st2t = document.getElementById('selection-team-two-teams'),
   mt1 = document.getElementById('team-one-name'),
   mt2 = document.getElementById('team-two-name'),
   lbs = document.getElementById('selection-live'),
   cbs = document.getElementById('selection-comms'),
   tbs = document.getElementById('selection-teams'),
   tosl = document.getElementById('team-one-Section'),
   tosl2 = document.getElementById('team-two-Section'),
   sgl = document.getElementById('selector-grid-two'),
   sgt = document.getElementById('selector-grid-teams'),
   tgto = document.getElementById('teamsGrid'),
   tgtt = document.getElementById('teamsGridTwo'),
   ngi = document.querySelector('.ngi'),
   lod = document.querySelector('#loader-1'),
   lodTx = document.querySelector('#load-tx'),
   rtse = document.getElementById('rtse'),
   matchVs = document.getElementById('addVs'),
   cover = document.querySelector('.cover'),
   t1fis = document.getElementById('team-one-score'),
   t2fis = document.getElementById('team-two-score'),
   t1fw = document.getElementById('team-one-wickets'),
   t2fw = document.getElementById('team-two-wickets'),
   gsts = document.getElementById('third-header-game-status'),
   wi1 = document.getElementById('winner-image-team-one'),
   wi2 = document.getElementById('winner-image-team-two'),
   innings1battingteam,
   shortNameOne,
   shortNameTwo,
   hoa,
   t1n,
   t2n,
   igsn,
   event_description,
   isHundreds,
   countHundreds = 0,
   bat_now,
   btnw,
   bowl_now,
   ovlg,
   btl = 0,
   currentOvr

gsts.innerHTML = ''
wi1.style.display = 'none'
wi2.style.display = 'none'

/* switch on to use with menu 

function matchRun(idNo) {
   var obj = {
      msg_type: 'feed_subscription',
      feed_id: idNo,
      feed_filter: ['event', 'powerbar', 'scorecard', 'scoreboard', 'lineups', 'commentary', 'match_update', 'scoregrid'],
   }
   var snd = JSON.stringify(obj)
   if (idNo == '1000006380LIVE1001' && socket == 0) {
      socket = new WebSocket('ws://demo-feed-widget-uat.decimalcricket.com/DEMO:Wi')
      socket.onopen = function () {
         socket.send(snd)
      }
   } else if (idNo == '1000006380LIVE1001' && socket.readyState == 1) {
      socket.close()
      socket = new WebSocket('ws://demo-feed-widget-uat.decimalcricket.com/DEMO:Wi')
      socket.onopen = function () {
         socket.send(snd)
      }
   } else if (idNo != '1000006380LIVE1001' && socket == 0) {
      socket = new WebSocket('ws://feed.decimalcricket.com')
      socket.onopen = function () {
         socket.send(snd)
      }
   } else if (idNo != '1000006380LIVE1001' && socket.readyState == 1) {
      socket.close()
      socket = new WebSocket('ws://feed.decimalcricket.com')
      socket.onopen = function () {
         socket.send(snd)
      }
   }
*/
// socket on message

socket.onmessage = function (event) {
   var msg = JSON.parse(event.data)

   // switch statment listens for messages

   switch (msg.msg_type) {
      case 'match_update':
         var { event_status, competition, description, start_datetime } = msg.match_update
         const gub = document.getElementById('main-body'),
            glb = document.getElementById('all-data-section'),
            pbp = document.getElementById('gameAndBallsInfo'),
            acdc = document.getElementById('countDownClock')
         masb = gsb

         // Opens widget dependant on event_status

         if (event_status === 'BREAK_IN_PLAY' || event_status === 'MATCH_SCHEDULED' || event_status === 'MATCH_COMPLETE') {
            snc1.innerHTML = ' '
            snc2.innerHTML = ' '
            var startDate = start_datetime.substr(0, 10),
               startTime = start_datetime.slice(11, 16)
            matchVs.innerHTML = competition + ' <br> ' + ' Start Date: ' + startDate + ' | ' + ' Start Time: ' + startTime
            mtin.innerHTML = description.replace(',', '<br/>')
            setInterval(function () {
               acdc.style.cssText = 'display: none; justify-content: center;'
            }, 1000)
            matchVs.style.cssText = 'margin: 0px 70px;'
            masb.style.cssText = 'visibility: hidden:'
            gub.style.cssText = 'background-image: url(Icons/cricketGround.png); background-repeat: no-repeat;'
            glb.style.cssText = 'visibility: hidden; display: none;'
            pbp.style.display = 'none'
            rtse.style.display = 'none'
            ngi.style.cssText = 'display: block;'
            cover.style.display = 'none'
            lod.style.display = 'none'
            lodTx.style.display = 'none'
         } else if (event_status === 'MATCH_STABLE' || event_status === 'RUNS_LIKELY' || event_status === 'BALL_IN_PROGRESS' || event_status === 'UMPIRE_REVIEW') {
            cover.style.display = 'block'
            snc1.innerHTML = ' '
            snc2.innerHTML = ' '
            rtse.style.display = 'block'
            glb.style.cssText = 'visibility: visible; display: block;'
            pbp.style.display = 'block'
            acdc.style.display = 'none'
            mtin.innerHTML = description
            matchVs.style.cssText = 'margin-top: 7px;'
            matchVs.innerHTML = ''
            masb.style.cssText = 'visibility: visible'
            gub.style.cssText = 'background-image: none;'
            ngi.style.display = 'none'
            lod.style.display = 'flex'
            lodTx.style.display = 'block'
         } else if (event_status === 'EVENT_CLOSED') {
            gub.style.cssText = 'background-image: url(Icons/cricketGround.png); background-repeat: no-repeat'
            mtin.innerHTML = 'The game is inactive<br>select another game'
            glb.style.cssText = 'visibility: hidden; display: none;'
            rtse.style.display = 'none'
            matchVs.innerHTML = 'Game Inactive'
            matchVs.style.cssText = 'margin-top: 7px;'
            masb.style.cssText = 'visibility: hidden'
            pbp.style.display = 'none'
            g2h.style.cssText = 'display: flex; align-items: center;'
            snc1.innerHTML = ' '
            snc2.innerHTML = ' '
            ngi.style.cssText = 'display: block;'
         }

         break

      case 'event':
         var { scoreline, event_description, scoreboard, event_status } = msg.event
         var bip = document.getElementById('third-header-game-info')

         for (i = 0; i < scoreboard.length; i++) {
            if (scoreboard[i].value == 100 && scoreboard[i].name == 'Max Overs') isHundreds = true
         }
         // Indicates break-in-play status

         if (event_description === 'Break in Play - Lunch') {
            bip.innerText = 'Break in Play - Lunch'
         } else if (event_description === 'Break in Play - Tea') {
            bip.innerText = 'Break in Play - Tea'
         } else if (event_description.substr(0, 13) === 'MATCH_COMPLETE') {
         }

         const sist = event_status.split('_').join(' ')

         // Changes match Stable to Waiting for Bowl

         gsts.innerHTML = sist
         if (scoreboard[0].name == 'away') {
            hoa = 'away'
         }

         // shows scoreline

         var gami = document.getElementsByClassName('gami')
         gami[0].innerHTML = scoreline
         gami[0].style.cssText = 'margin-top: 0px;'

         break

      case 'alerts':
         const { over } = msg.alerts
         currentOvr = over

         break

      case 'scoreboard':
         var { matchtitle, innings1battingteam, innings1bowlingteam, innings2runs, innings1runs, innings1wickets, innings2wickets, innings1overs, innings2overs, status, currentinnings } = msg.scoreboard

         //* disables loader when message activated */

         lod.style.display = 'none'
         lodTx.style.display = 'none'
         cover.style.display = 'none'

         var hmw = status.split(' ').slice(0, 2).join(' '),
            wnr = document.getElementById('winner-declaration')

         if (hmw == 'Match Complete' && innings1runs > innings2runs) {
            gami[0].innerHTML = scoreline
            wnr.innerHTML = status
            wi1.style.display = 'block'
            wi2.style.display = 'none'
            g2h.style.cssText = 'padding-right: 20px;'
         } else if (hmw == 'Match Complete' && innings1runs < innings2runs) {
            wnr.innerHTML = status
            wi1.style.display = 'none'
            wi2.style.display = 'block'
            g2h.style.cssText = 'padding-left: 20px;'
            gami[0].innerHTML = scoreline
         }

         // Team one Overs

         const tofo = document.getElementById('team-one-overs'),
            t2fo = document.getElementById('team-two-overs'),
            t1o = innings1overs,
            t1op1 = parseFloat(t1o) + 1
         tofo.innerHTML = '(' + t1o + ' Ovs' + ')'

         // Team Two Overs

         let t2o = innings2overs,
            t2op1 = parseFloat(t2o) + 1,
            TeamOneScore = innings1runs,
            t2s = innings2runs
         t1fis.innerHTML = TeamOneScore + ' / '
         t2fis.innerHTML = t2s + ' / '

         // change batting or bowling Icon

         const ftbi = document.getElementById('icon-team-one'),
            stbi = document.getElementById('icon-team-two'),
            t1sl = TeamOneScore.toString().length

         // Current Wickets Team One

         t1fw.innerHTML = innings1wickets

         if (currentinnings == 1 || currentinnings == 3) {
            t2fis.innerHTML = ''
            t2fo.innerHTML = ''
         } else if (currentinnings == 2 || currentinnings == 4) {
            t2fis.innerHTML = t2s + ' / '
            t2fo.innerHTML = '(' + t2o + ' Ovs' + ')'
            ftbi.style.display = 'none'
            stbi.style.display = 'block'
            // Current Wickets Team Two
            teamTwoWickets = innings2wickets
            t2fw.innerHTML = teamTwoWickets
         }

         // Team playing

         t1n = innings1battingteam
         t2n = innings1bowlingteam
         mt1.innerHTML = t1n
         mt2.innerHTML = t2n
         matchVs.style.cssText = 'display: flex; justify-content: center; vertical-align: center;'
         matchVs.innerHTML = 'vs'

         // Show Match Info

         mtin.innerHTML = matchtitle

         // Displays  end of day

         if (status === 'Break in Play - Stumps') {
            mtin.innerHtml = status
         } else {
            mtin.innerHTML = matchtitle
         }

         // Team names

         snc1.innerHTML = shortNameOne
         snc2.innerHTML = shortNameTwo

         break

      case 'bowling_analysis':
         var { bowler } = msg.bowling_analysis
         break

      case 'powerbar':
         var { team1winpercentage, team2winpercentage } = msg.powerbar

         let teamnOneWinPercentage = team1winpercentage * 100,
            powerBart1 = teamnOneWinPercentage.toFixed(0),
            t1pe = document.getElementById('team-one-percentage'),
            t2pe = document.getElementById('team-two-percentage')
         teamTwoWinPercentage = team2winpercentage * 100
         powerBart2 = teamTwoWinPercentage.toFixed(0)

         pb.style.width = teamTwoWinPercentage + '%'

         // if statement finds which team is the the left of powerbar

         if (hoa == 'away') {
            t1pe.innerHTML = shortNameOne + ' ' + powerBart2 + '%'
            t2pe.innerHTML = shortNameTwo + ' ' + powerBart1 + '%'
         } else {
            t1pe.innerHTML = shortNameTwo + ' ' + powerBart2 + '%'
            t2pe.innerHTML = shortNameOne + ' ' + powerBart1 + '%'
         }

         break

      // Scorecard case

      case 'scorecard':
         var { bat_now, inns_now, inns1, inns2, inns3, inns4 } = msg.scorecard
         btnw = bat_now
         igsn = inns_now

         const inssNow = document.querySelector('#ins-now')
         inssNow.innerHTML = 'Inning: ' + inns_now

         let insNo,
            ino3,
            intf,
            // First team batting
            t1b = document.getElementsByClassName('b1sn'),
            stts = document.querySelectorAll('.b1st'),
            t1b2 = document.querySelectorAll('.b1b'),
            t1r = document.querySelectorAll('.b1r'),
            t14s = document.querySelectorAll('.b14s'),
            t16s = document.querySelectorAll('.b16s'),
            // First Team extras and total
            ex1 = document.querySelectorAll('.ex1'),
            tl1 = document.querySelectorAll('.tl1'),
            // Second Team batting
            b1sn2 = document.getElementsByClassName('b1sn2'),
            b1st2 = document.querySelectorAll('.b1st2'),
            b1b2 = document.querySelectorAll('.b1b2'),
            b1r2 = document.querySelectorAll('.b1r2'),
            b14s2 = document.querySelectorAll('.b14s2'),
            b16s2 = document.querySelectorAll('.b16s2'),
            bw1w2wkt = document.querySelectorAll('.bw1w2wkt'),
            // Second Team extras and total
            ex2 = document.querySelectorAll('.ex2'),
            tl2 = document.querySelectorAll('.tl2'),
            // First team bowling
            t2bnb = document.querySelectorAll('.bw1nb'),
            t2bo = document.querySelectorAll('.bw1o'),
            t2br = document.querySelectorAll('.bw1r'),
            t2bw2 = document.querySelectorAll('.bw1w'),
            t2bw = document.getElementsByClassName('bw1sn'),
            bw1wkt = document.getElementsByClassName('bw1wkt'),
            // Second team bowling
            t2bnb2 = document.querySelectorAll('.bw1sn2'),
            t2bo2 = document.querySelectorAll('.bw1o2'),
            t2br2 = document.querySelectorAll('.bw1r2'),
            t2bw22 = document.querySelectorAll('.bw1w2'),
            t2bw222 = document.getElementsByClassName('bw1nb2')

         // switch statement looks for inning no

         switch (inns_now) {
            case 1:
               insNo = inns1
               ino3 = inns1
               intf = null
               break
            case 2:
               insNo = inns2
               ino3 = inns1
               intf = inns2
               break
            case 3:
               insNo = inns3
               ino3 = inns3
               intf = null
               break
            case 4:
               insNo = inns4
               ino3 = inns3
               intf = inns4
               break
         }

         // Takes extras object transforms into array and used reduce to add values together

         for (j = 0; j < t1r.length; j++) {
            t1r[j].innerHTML = ino3.batting[j].runs
            t1b2[j].innerHTML = ino3.batting[j].balls
            t14s[j].innerHTML = ino3.batting[j].fours
            t16s[j].innerHTML = ino3.batting[j].sixes
            t2bnb[j].innerHTML = ino3.bowling[j].nb
            t2bo[j].innerHTML = ino3.bowling[j].overs
            t2br[j].innerHTML = ino3.bowling[j].runs
            t2bw2[j].innerHTML = ino3.bowling[j].wd
            bw1wkt[j].innerHTML = ino3.bowling[j].wickets
            stts[j].innerHTML = ino3.batting[j].status.replace(/,[^,]+$/, '')
         }

         /* Batting order */

         const extrar = Object.values(ino3.extras),
            addext = extrar.reduce(function (acc, val) {
               return acc + val
            }, 0)

         ex1[0].innerText = addext
         tl1[0].innerText = t1fis.textContent.replace(' / ', '') + '  ' + ' ( ' + t1fw.textContent + ' wkts' + ' ) '

         for (i = 0; i < t1b.length; i++) {
            t1b[i].innerHTML = ino3.batting[i].name
            if (t1b[i].textContent == '') {
               t1b[i].style.display = 'none'
               stts[i].style.display = 'none'
               t1b2[i].style.display = 'none'
               t1r[i].style.display = 'none'
               t14s[i].style.display = 'none'
               t16s[i].style.display = 'none'
            } else {
               t1b[i].style.display = 'block'
               stts[i].style.display = 'block'
               t1b2[i].style.display = 'block'
               t1r[i].style.display = 'block'
               t14s[i].style.display = 'block'
               t16s[i].style.display = 'block'
            }
         }

         for (i = 0; i < t2bw.length; i++) {
            t2bw[i].innerHTML = ino3.bowling[i].name
            if (ino3.bowling[i].name == '') {
               t2bnb[i].style.display = 'none'
               t2bo[i].style.display = 'none'
               t2br[i].style.display = 'none'
               t2bw2[i].style.display = 'none'
            } else {
               t2bnb[i].style.display = 'block'
               t2bo[i].style.display = 'block'
               t2br[i].style.display = 'block'
               t2bw2[i].style.display = 'block'
            }
         }

         if (inns2 != null) {
            for (j = 0; j < t1r.length; j++) {
               b1r2[j].innerHTML = intf.batting[j].runs
               b1b2[j].innerHTML = intf.batting[j].balls
               b14s2[j].innerHTML = intf.batting[j].fours
               b16s2[j].innerHTML = intf.batting[j].sixes
               t2bw222[j].innerHTML = intf.bowling[j].nb
               t2bo2[j].innerHTML = intf.bowling[j].overs
               t2br2[j].innerHTML = intf.bowling[j].runs
               t2bw22[j].innerHTML = intf.bowling[j].wd
               bw1w2wkt[j].innerHTML = intf.bowling[j].wickets
               b1st2[j].innerHTML = intf.batting[j].status.replace(/,[^,]+$/, '')
            }
            const extrar = Object.values(intf.extras),
               addext2 = extrar.reduce(function (acc, val) {
                  return acc + val
               }, 0)
            ex2[0].innerText = addext2
            tl2[0].innerText = t2fis.textContent.replace(' / ', '') + '  ' + ' ( ' + t2fw.textContent + ' wkts' + ' ) '

            for (i = 0; i < b1sn2.length; i++) {
               b1sn2[i].innerHTML = intf.batting[i].name
               if (b1sn2[i].textContent == '') {
                  b1sn2[i].style.display = 'none'
                  b1st2[i].style.display = 'none'
                  b1b2[i].style.display = 'none'
                  b1r2[i].style.display = 'none'
                  b14s2[i].style.display = 'none'
                  b16s2[i].style.display = 'none'
               } else {
                  b1sn2[i].style.display = 'block'
                  b1st2[i].style.display = 'block'
                  b1b2[i].style.display = 'block'
                  b1r2[i].style.display = 'block'
                  b14s2[i].style.display = 'block'
                  b16s2[i].style.display = 'block'
               }
            }

            for (i = 0; i < t2bnb2.length; i++) {
               t2bnb2[i].innerHTML = intf.bowling[i].name
               if (t2bnb2[i].textContent == '') {
                  t2bnb2[i].style.display = 'none'
                  t2bo2[i].style.display = 'none'
                  t2br2[i].style.display = 'none'
                  t2bw22[i].style.display = 'none'
                  t2bw222[i].style.display = 'none'
               } else {
                  t2bnb2[i].style.display = 'block'
                  t2bo2[i].style.display = 'block'
                  t2br2[i].style.display = 'block'
                  t2bw22[i].style.display = 'block'
                  t2bw222[i].style.display = 'block'
               }
            }
         }

         let scrgl = document.querySelectorAll('.scorecard-grid')
         for (i = 0; i < scrgl.length; i++) {
            if (t1b[i].textContent != '') {
               scrgl[i].style.cssText = 'grid-template-rows: 30px;'
            }
         }

         let scrglb = document.querySelectorAll('.scorecard-grid-bowl')
         for (i = 0; i < scrglb.length; i++) {
            if (t2bw[i].textContent != '') {
               scrglb[i].style.cssText = 'grid-template-rows: 30px;'
            }
         }

         tbs.addEventListener('click', function () {
            sgt.style.display = 'block'
            tosl.style.display = 'none'
            tosl2.style.display = 'none'
            sgl.style.display = 'none'
            cmli.style.display = 'none'
            cbs.style.cssText = 'background-color: #221f1f'
            lbs.style.cssText = 'background-color: #221f1f'
            tbs.style.cssText = 'background-color: #2483c5'
            tgto.style.display = 'grid'
            tgtt.style.display = 'none'
            st1t.style.cssText = 'background-color: #2483c5'
         })
         st1t.addEventListener('click', function () {
            tgto.style.display = 'grid'
            tgtt.style.display = 'none'
            st2t.style.cssText = 'background-color: #221f1f'
            st1t.style.cssText = 'background-color: #2483c5'
         })
         st2t.addEventListener('click', function () {
            tgtt.style.display = 'grid'
            tgto.style.display = 'none'
            st1t.style.cssText = 'background-color: #221f1f'
            st2t.style.cssText = 'background-color: #2483c5'
         })

         lbs.addEventListener('click', function () {
            tosl.style.display = 'grid'
            tosl2.style.display = 'none'
            sgl.style.display = 'block'
            sgt.style.display = 'none'
            tgto.style.display = 'none'
            tgtt.style.display = 'none'
            cbs.style.cssText = 'background-color: #221f1f'
            lbs.style.cssText = 'background-color: #2483c5'
            tbs.style.cssText = 'background-color: #221f1f'
            st1.style.cssText = 'background-color: #2483c5'
            st2.style.cssText = 'background-color: #221f1f'
            cmli.style.display = 'none'
            st2t.style.cssText = 'background-color: #221f1f'
            st1t.style.cssText = 'background-color: #221f1f'
         })
         st1.addEventListener('click', function () {
            st1.style.cssText = 'background-color: #2483c5'
            st2.style.cssText = 'background-color: #221f1f'
            tosl2.style.display = 'none'
            tosl.style.display = 'block'
         })
         st2.addEventListener('click', function () {
            st2.style.cssText = 'background-color: #2483c5'
            st1.style.cssText = 'background-color: #221f1f'
            tosl.style.display = 'none'
            tosl2.style.display = 'block'
         })

         break

      case 'lineups':
         const { teams } = msg.lineups
         /* Team name for teams and batter and bowler */
         var t1p = document.getElementsByClassName('b'),
            t2p = document.getElementsByClassName('b2'),
            hdb1 = document.getElementsByClassName('hdb1'),
            hdb2 = document.getElementsByClassName('hdb2'),
            hdbw1 = document.getElementsByClassName('hdbw1'),
            hdbw2 = document.getElementsByClassName('hdbw2'),
            shortnameOne

         // Check all of this! // if innings1team === teams[p]

         if (mt1.textContent == teams[0].name) {
            st1.innerHTML = teams[0].short_name
            st2.innerHTML = teams[1].short_name
         } else if (mt1.textContent == teams[1].name) {
            st1.innerHTML = teams[1].short_name
            st2.innerHTML = teams[0].short_name
         }
         for (i = 0; i < t1p.length; i++) {
            if (t1n == teams[0].short_name) {
               shortNameOne = teams[0].short_name
               shortNameTwo = teams[1].short_name
               st1t.innerHTML = teams[0].short_name
               st2t.innerHTML = teams[1].short_name
            } else {
               shortNameOne = teams[1].short_name
               shortNameTwo = teams[0].short_name
               st1t.innerHTML = teams[1].short_name
               st2t.innerHTML = teams[0].short_name
            }

            if (btnw == teams[0].name) {
               t1p[i].innerHTML = teams[0].players[i].name
               t2p[i].innerHTML = teams[1].players[i].name
               hdbw1[i].innerHTML = teams[01].players[i].bowler_style
               hdbw2[i].innerHTML = teams[1].players[i].bowler_style
               bhcp = teams[0].players[i].bat_hand.split('-')[0]
               bhcp2 = teams[1].players[i].bat_hand.split('-')[0]
               hdb1[i].innerHTML = bhcp.charAt(0).toUpperCase() + bhcp.slice(1)
               hdb2[i].innerHTML = bhcp2.charAt(0).toUpperCase() + bhcp2.slice(1)
            } else {
               t1p[i].innerHTML = teams[1].players[i].name
               t2p[i].innerHTML = teams[0].players[i].name
               hdbw1[i].innerHTML = teams[1].players[i].bowler_style
               hdbw2[i].innerHTML = teams[0].players[i].bowler_style
               bhcp = teams[1].players[i].bat_hand.split('-')[0]
               bhcp2 = teams[0].players[i].bat_hand.split('-')[0]
               hdb1[i].innerHTML = bhcp.charAt(0).toUpperCase() + bhcp.slice(1)
               hdb2[i].innerHTML = bhcp2.charAt(0).toUpperCase() + bhcp2.slice(1)
            }
         }

         const wpb = document.getElementById('win-probability-bar')

         if (teams[0].name == mt1.textContent) {
            pb.style.backgroundColor = '#' + teams[0].team_colour
            wpb.style.backgroundColor = '#' + teams[1].team_colour
         } else if (teams[1].name == mt2.textContent) {
            pb.style.backgroundColor = '#' + teams[1].team_colour
            wpb.style.backgroundColor = '#' + teams[0].team_colour
         } else {
            return
         }
         break

      case 'commentary':
         var { commentaries, current_over, current_over_balls } = msg.commentary
         var coms = document.getElementsByClassName('cms'),
            ndcm = document.getElementById('comms-list').childNodes
         let int = parseInt(current_over, 10),
            intn = parseInt(current_over) - 1
         ;(cint = int.toString()), (covb = parseInt(current_over_balls, 10))
         for (k = 0; k < coms.length; k++) {
            const crtbl = parseInt([k], 10) + 1

            if (commentaries[k].split('-')[0] == '.') {
               coms[k].innerHTML = cint + '.' + crtbl + '  '
            } else {
               let covb0, covb1, covb2, covb3, covb4, covb5
               if (current_over_balls != '') {
                  if (current_over == 0 && current_over_balls <= 5) {
                     switch (covb) {
                        case 0:
                           covb0 = ''
                           covb1 = ''
                           covb2 = ''
                           covb3 = ''
                           covb4 = ''
                           covb5 = ''
                           int0 = 0
                           int1 = 0
                           int2 = 0
                           int3 = 0
                           int4 = 0
                           int5 = 0
                           break
                        case 1:
                           covb0 = 1
                           covb1 = ''
                           covb2 = ''
                           covb3 = ''
                           covb4 = ''
                           covb5 = ''
                           int0 = int
                           int1 = int
                           int2 = int
                           int3 = int
                           int4 = int
                           int5 = int
                           break
                        case 2:
                           covb0 = 2
                           covb1 = 1
                           covb2 = ''
                           covb3 = ''
                           covb4 = ''
                           covb5 = ''
                           int0 = int
                           int1 = int
                           int2 = int
                           int3 = int
                           int4 = int
                           int5 = int
                           break
                        case 3:
                           covb0 = 3
                           covb1 = 2
                           covb2 = 1
                           covb3 = ''
                           covb4 = ''
                           covb5 = ''
                           int0 = int
                           int1 = int
                           int2 = int
                           int3 = int
                           int4 = int
                           int5 = int
                           break
                        case 4:
                           covb0 = 4
                           covb1 = 3
                           covb2 = 2
                           covb3 = 1
                           covb4 = ''
                           covb5 = ''
                           int0 = int
                           int1 = int
                           int2 = int
                           int3 = int
                           int4 = int
                           int5 = int
                           break
                        case 5:
                           covb0 = 5
                           covb1 = 4
                           covb2 = 3
                           covb3 = 2
                           covb4 = 1
                           covb5 = ''
                           int0 = int
                           int1 = int
                           int2 = int
                           int3 = int
                           int4 = int
                           int5 = int
                           break
                        case 6:
                           covb0 = 6
                           covb1 = 5
                           covb2 = 4
                           covb3 = 3
                           covb4 = 2
                           covb5 = 1
                           int0 = int
                           int1 = int
                           int2 = int
                           int3 = int
                           int4 = int
                           int5 = int
                           break
                     }
                  } else if (current_over > 0) {
                     switch (covb) {
                        case 0:
                           int0 = intn
                           int1 = intn
                           int2 = intn
                           int3 = intn
                           int4 = intn
                           int5 = intn
                           covb0 = 6
                           covb1 = 5
                           covb2 = 4
                           covb3 = 3
                           covb4 = 2
                           covb5 = 1
                           break
                        case 1:
                           int0 = int
                           int1 = intn
                           int2 = intn
                           int3 = intn
                           int4 = intn
                           int5 = intn
                           covb0 = 1
                           covb1 = 6
                           covb2 = 5
                           covb3 = 4
                           covb4 = 3
                           covb5 = 2
                           break
                        case 2:
                           int0 = int
                           int1 = int
                           int2 = intn
                           int3 = intn
                           int4 = intn
                           int5 = intn
                           covb0 = 2
                           covb1 = 1
                           covb2 = 6
                           covb3 = 5
                           covb4 = 4
                           covb5 = 3
                           break
                        case 3:
                           int0 = int
                           int1 = int
                           int2 = int
                           int3 = intn
                           int4 = intn
                           int5 = intn
                           covb0 = 3
                           covb1 = 2
                           covb2 = 1
                           covb3 = 6
                           covb4 = 5
                           covb5 = 4
                           break
                        case 4:
                           int0 = int
                           int1 = int
                           int2 = int
                           int3 = int
                           int4 = intn
                           int5 = intn
                           covb0 = 4
                           covb1 = 3
                           covb2 = 2
                           covb3 = 1
                           covb4 = 6
                           covb5 = 5
                           break
                        case 5:
                           int0 = int
                           int1 = int
                           int2 = int
                           int3 = int
                           int4 = int
                           int5 = intn
                           covb0 = 5
                           covb1 = 4
                           covb2 = 3
                           covb3 = 2
                           covb4 = 1
                           covb5 = 6
                           break
                        case 6:
                           int0 = int
                           int1 = int
                           int2 = int
                           int3 = int
                           int4 = int
                           int5 = int
                           covb0 = 6
                           covb1 = 5
                           covb2 = 4
                           covb3 = 3
                           covb4 = 2
                           covb5 = 1
                           break
                     }
                  }
                  coms[0].innerHTML = int0 + '.' + covb0 + '  ' + '| ' + commentaries[0].split('-')[0]
                  coms[1].innerHTML = int1 + '.' + covb1 + '  ' + '| ' + commentaries[1].split('-')[0]
                  coms[2].innerHTML = int2 + '.' + covb2 + '  ' + '| ' + commentaries[2].split('-')[0]
                  coms[3].innerHTML = int3 + '.' + covb3 + '  ' + '| ' + commentaries[3].split('-')[0]
                  coms[4].innerHTML = int4 + '.' + covb4 + '  ' + '| ' + commentaries[4].split('-')[0]
                  coms[5].innerHTML = int5 + '.' + covb5 + '  ' + '| ' + commentaries[5].split('-')[0]
               }
            }
         }

         break

      case 'scoregrid':
         const { overs } = msg.scoregrid

         console.log(currentOvr)

         currentOvr.addEventListener('change', incFun)

         function incFun() {
            console.log(incFun)
         }

         let nxt = igsn - 1,
            asArray = Object.entries(overs),
            fltAr = asArray[nxt].filter(([key, value]) => value != ''),
            fltin = fltAr[1],
            recent = document.querySelector('.recent'),
            rt = document.querySelectorAll('.rt'),
            eachObj,
            property
         fltinlt = Array.from(fltin)
         for (i = 0; i < recent.length; i++) {
            rt[i].innerH
            TML = ''
         }
         /* Mutates Object to remove properties not needed for play-by-play, */

         for (i = 0; i < fltin.length; i++) {
            eachObj = fltinlt[i]
            delete eachObj['bowlerid']
            delete eachObj['ov']
            delete eachObj['runs']
            delete eachObj['total']
            delete eachObj['wkts']

            /* Checks for repeated property 
            /* Removed b7/8/9/10 if no extra balls played */

            if (fltinlt[i].b7 == null) {
               delete eachObj['b7']
               delete eachObj['b8']
               delete eachObj['b9']
               delete eachObj['b10']
            } else if (fltinlt[i].b7 != null || fltinlt[i].b8 == null) {
               delete eachObj['b8']
               delete eachObj['b9']
               delete eachObj['b10']
               delete eachObj['b10']
            } else if (fltinlt[i].b7 != null || fltinlt[i].b10 == null) {
               delete eachObj['b10']
            }
            if (isHundreds == false || isHundreds == undefined) {
               ovlg = 12
               if (fltinlt.length <= 2) {
                  rt[0].innerHTML = fltin[0].b1
                  rt[1].innerHTML = fltin[0].b2
                  rt[2].innerHTML = fltin[0].b3
                  rt[3].innerHTML = fltin[0].b4
                  rt[4].innerHTML = fltin[0].b5
                  rt[5].innerHTML = fltin[0].b6
                  if (fltinlt[1] != undefined) {
                     rt[6].innerHTML = fltin[1].b1
                     rt[7].innerHTML = fltin[1].b2
                     rt[8].innerHTML = fltin[1].b3
                     rt[9].innerHTML = fltin[1].b4
                     rt[10].innerHTML = fltin[1].b5
                     rt[11].innerHTML = fltin[1].b6
                  }
               } else if (fltinlt.length == 3) {
                  for (i = 0; i < fltinlt.length; i++) {
                     rt[0].innerHTML = fltin[i].b1
                     rt[1].innerHTML = fltin[i].b2
                     rt[2].innerHTML = fltin[i].b3
                     rt[3].innerHTML = fltin[i].b4
                     rt[4].innerHTML = fltin[i].b5
                     rt[5].innerHTML = fltin[i].b6
                     rt[6].innerHTML = fltin[0].b1
                     rt[7].innerHTML = fltin[0].b2
                     rt[8].innerHTML = fltin[0].b3
                     rt[9].innerHTML = fltin[0].b4
                     rt[10].innerHTML = fltin[0].b5
                     rt[11].innerHTML = fltin[0].b6
                  }
               } else if (fltinlt.length > 3) {
                  for (i = 0; i < fltinlt.length; i++) {
                     rt[0].innerHTML = fltin[i].b1
                     rt[1].innerHTML = fltin[i].b2
                     rt[2].innerHTML = fltin[i].b3
                     rt[3].innerHTML = fltin[i].b4
                     rt[4].innerHTML = fltin[i].b5
                     rt[5].innerHTML = fltin[i].b6
                     const slitwo = fltin.slice(-2)
                     rt[6].innerHTML = slitwo[0].b1
                     rt[7].innerHTML = slitwo[0].b2
                     rt[8].innerHTML = slitwo[0].b3
                     rt[9].innerHTML = slitwo[0].b4
                     rt[10].innerHTML = slitwo[0].b5
                     rt[11].innerHTML = slitwo[0].b6
                  }
               }
            } else if (isHundreds == true) {
               if (countHundreds == 0) {
                  countHundreds++
                  recent.removeChild(recent.children[1])
                  recent.removeChild(recent.children[11])
                  ovlg = 10
               }
               if (fltinlt.length <= 2) {
                  rt[0].innerHTML = fltin[0].b1
                  rt[1].innerHTML = fltin[0].b2
                  rt[2].innerHTML = fltin[0].b3
                  rt[3].innerHTML = fltin[0].b4
                  rt[4].innerHTML = fltin[0].b5
                  if (fltinlt[1] != undefined) {
                     rt[5].innerHTML = fltin[1].b1
                     rt[6].innerHTML = fltin[1].b2
                     rt[7].innerHTML = fltin[1].b3
                     rt[8].innerHTML = fltin[1].b4
                     rt[9].innerHTML = fltin[1].b5
                  }
               } else if (fltinlt.length == 3) {
                  for (i = 0; i < fltinlt.length; i++) {
                     rt[0].innerHTML = fltin[i].b1
                     rt[1].innerHTML = fltin[i].b2
                     rt[2].innerHTML = fltin[i].b3
                     rt[3].innerHTML = fltin[i].b4
                     rt[4].innerHTML = fltin[i].b5
                     rt[5].innerHTML = fltin[0].b1
                     rt[6].innerHTML = fltin[0].b2
                     rt[7].innerHTML = fltin[0].b3
                     rt[8].innerHTML = fltin[0].b4
                     rt[9].innerHTML = fltin[0].b5
                  }
               } else if (fltinlt.length > 3) {
                  for (i = 0; i < fltinlt.length; i++) {
                     rt[0].innerHTML = fltin[i].b1
                     rt[1].innerHTML = fltin[i].b2
                     rt[2].innerHTML = fltin[i].b3
                     rt[3].innerHTML = fltin[i].b4
                     rt[4].innerHTML = fltin[i].b5
                     const slitwo = fltin.slice(-2)
                     rt[5].innerHTML = slitwo[0].b1
                     rt[6].innerHTML = slitwo[0].b2
                     rt[7].innerHTML = slitwo[0].b3
                     rt[8].innerHTML = slitwo[0].b4
                     rt[9].innerHTML = slitwo[0].b5
                  }
               }
            }
            for (it = 0; it < ovlg; it++) {
               switch (rt[it].textContent) {
                  case '-':
                     rt[it].style.cssText = 'background-color: #CCCCCC; color: #fff; padding: 6.4px 10px;'
                     break
                  case '':
                     rt[it].style.cssText = 'background-color: #CCCCCC; color: #fff; padding: 6.4px 13px;'
                     break
                  case '0':
                     rt[it].style.cssText = 'background-color: #CCCCCC; color: #000000; padding: 6.4px 10px;'
                     break
                  case '1':
                     rt[it].style.cssText = 'background-color: #CCCCCC; color: #000000;padding: 6.4px 10px;'
                     break
                  case '2':
                     rt[it].style.cssText = 'background-color: #2188CD; color: #000000;padding: 6.4px 10px;'
                     break
                  case '3':
                     rt[it].style.cssText = 'background-color: #2188CD; color: #000000;padding: 6.4px 10px;'
                     break
                  case '4':
                     rt[it].style.cssText = 'background-color: #162738; color: #fff;padding: 6.4px 10px;'
                     break
                  case '5':
                     rt[it].style.cssText = 'background-color: #162738; color: #fff;padding: 6.4px 10px;'
                     break
                  case '6':
                     rt[it].style.cssText = 'background-color: #F96D33; color: #fff; padding: 6.4px 10px;'
                     break
                  case '4ar':
                     rt[it].style.cssText = 'background-color: #162738; color: #000000;padding: 6.4px 8px'
                     break
                  case 'W':
                     rt[it].style.cssText = 'background-color: #000; color: #fff;padding: 6.4px 9px; text-transform: lowercase;'
                     break
                  case 'w0':
                     rt[it].style.cssText = 'background-color: #000; color: #fff;padding: 6.4px 7px'
                     break
                  case 'w1':
                     rt[it].style.cssText = 'background-color: #000; color: #fff;padding: 6.4px 7px'
                     break
                  case 'w2':
                     rt[it].style.cssText = 'background-color: #000; color: #fff;padding: 6.4px 7px'
                     break
                  case 'wn':
                     rt[it].style.cssText = 'background-color: #000; color: #fff;padding: 6.4px 7px'
                     break
                  case 'w1n':
                     rt[it].style.cssText = 'background-color: #000; color: #fff;padding: 6.4px 7px'
                     break
                  case 'w2n':
                     rt[it].style.cssText = 'background-color: #000; color: #fff;padding: 6.4px 7px'
                     break
                  case 'l1':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case 'l2':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case 'l3':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case 'l4':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case 'l5':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '1b':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '2b':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '3b':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '4b':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '5b':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case 'sw':
                     rt[it].style.cssText = 'background-color: #000; color: #fff;padding: 6.4px 7px'
                     break
                  case 'sw':
                     rt[it].style.cssText = 'background-color: #000; color: #fff;padding: 6.4px 7px'
                     break
                  case '0w':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '1w':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '2w':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '3w':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '4w':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '0n':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '1n':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '2n':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '3n':
                     rt[it].style.cssText = 'background-color: #4BC408; color: #000;padding: 6.4px 7px'
                     break
                  case '4n':
                     rt[it].style.cssText = 'background-color: #144708; color: #fff;padding: 6.4px 7px'
                     break
                  case '5n':
                     rt[it].style.cssText = 'background-color: #144708; color: #fff; padding: 6.4px 7px'
                     break
                  case '6n':
                     rt[it].style.cssText = 'background-color: #144708; color: #fff; padding: 6.4px 7px'
                     break
                  default:
                     rt[it].style.cssText = 'background-color: #CCCCCC; color: #000; padding: 6.4px 10px;'
                     rt[it].innerHTML = '-'
                     break
               }
            }
         }
         break
   }
}
//}

// Adds "unknown" to teams fields with no data

const nds = document.getElementById('teamsGrid').childNodes,
   ndst2 = document.getElementById('teamsGridTwo').childNodes
for (i = 0; i < nds.length; i++) {
   if (nds[i].textContent == '0' || nds[i].textContent == '' || nds[i].textContent == '.') {
      nds[i].innerHTML = '-'
   } else if (ndst2[i].textContent == '0' || ndst2[i].textContent == '' || ndst2[i].textContent == '.') {
      ndst2[i].innerHTML = '-'
   }
}

// Opns team batting scores first

let opni = false
function opno() {
   opni = true
   tosl.style.display = 'grid'
   tosl2.style.display = 'none'
   sgl.style.display = 'block'
   sgt.style.display = 'none'
   cbs.style.cssText = 'background-color: #221f1f'
   lbs.style.cssText = 'background-color: #2483c5'
   tbs.style.cssText = 'background-color: #221f1f'
   lbs.style.cssText = 'background-color: #2483c5'
   st1.style.cssText = 'background-color: #2483c5'
}
function opot() {
   if (!opni) opno()
}
opot()

cbs.addEventListener('click', function () {
   tosl.style.display = 'none'
   tosl2.style.display = 'none'
   sgl.style.display = 'none'
   sgt.style.display = 'none'
   tgto.style.display = 'none'
   tgtt.style.display = 'none'
   cmli.style.display = 'block'
   cbs.style.cssText = 'background-color: #2483c5'
   lbs.style.cssText = 'background-color: #221f1f'
   tbs.style.cssText = 'background-color: #221f1f'
   st2t.style.cssText = 'background-color: #221f1f'
   st1t.style.cssText = 'background-color: #221f1f'
})
