let audio = new Audio();
var request = new XMLHttpRequest();
var count = 0;

function Main(){
    return {
        DiscordGuildId: '1244629180847624234',
        DiscordInviteLink: "https://discord.gg/yukarp",
        DiscordInviteLink1: "https://discord.gg/yuka",
        memberCount: 1,
        musicAutoplay: true,
        musicVolume: 0.5,
        buttons:[
            {label: 'Accueil', selected: true},
            {label: 'Nouveautés', selected: false},
            {label: 'Equipe', selected: false},
        ],
        musicList: [
            {label: 'Carbonne - Imagine', author: 'Carbonne - Imagine (Visualizer)', src: 'audio/imagine.mp3'},
            {label: 'Melanine', author: 'Heuss & Werenoi', src: 'audio/heuss.mp3'},
            {label: 'Stone Island', author: 'Uzi', src: 'audio/music.mp3'},
            {label: 'Marijuana', author: 'Space', src: 'audio/musicmarijuana.mp3'},
        ],
        team:[
            {discord: 'Louis', role: 'Fondateur', img: 'img/louis.webp', socials: {discord: '#', twitter: '#'}},
            {discord: 'Salah', role: 'Développeur', img: 'img/salah.webp', socials: {discord: '#', twitter: '#'}},
            {discord: 'Seijuro', role: 'Fondateur', img: 'img/seijuro.webp', socials: {discord: '#', twitter: '#'}},
        ],
        isMusicPlaying: false,
        musicOpen: false,
        currentSong: 0,
        teamFilter: 'all',
        filteredTeam: [],
        
        init() {
            this.filteredTeam = this.team;
            if(this.musicAutoplay){
                setTimeout(() => { this.play(); }, 100);
            }
            this.fetchDiscordCount();
        },
        
        fetchDiscordCount() {
            request.open('GET', 'https://discordapp.com/api/guilds/'+this.DiscordGuildId+'/widget.json', true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText);
                    count = data.presence_count;
                }
            };    
            request.onerror = function() {};
            request.send();   
            setTimeout(() => { this.memberCount = count; }, 1000);
        },
        
        filterTeam(role) {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            event.target.classList.add('active');
            
            this.teamFilter = role;
            if (role === 'all') {
                this.filteredTeam = this.team;
            } else {
                this.filteredTeam = this.team.filter(member => member.role.includes(role));
            }
            
            const container = document.querySelector('.team-container');
            if (container) {
                container.style.opacity = 0;
                setTimeout(() => {
                    container.style.opacity = 1;
                }, 300);
            }
        },
        scrollTeam(direction) {
            const container = document.querySelector('.team-container');
            const scrollAmount = 24;
            
            if (direction === 'up') {
                container.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
            } else {
                container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            }
        },
        selectBtn(select){
            this.buttons.forEach(function(button){
                button.selected = false;
            });
            return true;
        },
        
        play(){
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            audio.volume = this.musicVolume;
            this.isMusicPlaying = true;
        },
        
        pause(){
            audio.pause();
            this.isMusicPlaying = false;
        },
        
        next(){
            if(this.isMusicPlaying){
                audio.pause();
            }
            if(this.currentSong < this.musicList.length-1){
                this.currentSong++;
            } else {
                this.currentSong = 0;
            }
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            this.isMusicPlaying = true;
        },
        
        prev(){
            if(this.isMusicPlaying){
                audio.pause();
            }
            if(this.currentSong !== 0){
                this.currentSong = this.currentSong-1;
            } else {
                this.currentSong = this.musicList.length-1;
            }
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            this.isMusicPlaying = true;
        }
    }
}