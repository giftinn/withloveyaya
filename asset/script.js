        function createFloatingHearts() {
            const heartsContainer = document.getElementById('heartsBackground');
            const heartSymbols = ['💕', '❤️', '💖', '💝', '💗', '💓'];
            
            for (let i = 0; i < 20; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 6 + 's';
                heartsContainer.appendChild(heart);
            }
        }

        function checkPassword() {
            const password = document.getElementById('passwordInput').value;
            if (password.toLowerCase() === '2711') {
                document.getElementById('loginScreen').style.display = 'none';
                document.getElementById('mainContent').style.display = 'block';
            } else {
                alert('💔 Oops! That\'s not the right password. Try again! 💔');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            createFloatingHearts();
            document.getElementById('passwordInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    checkPassword();
                }
            });
        });


        function showPage(pageId) {
          
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            document.getElementById(pageId).classList.add('active');

            event.target.classList.add('active');
        }

        let currentUploadTarget = null;

        function uploadPhoto(element) {
            currentUploadTarget = element;
            document.getElementById('photoUpload').click();
        }

        function handlePhotoUpload(event) {
            const file = event.target.files[0];
            if (file && currentUploadTarget) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentUploadTarget.style.backgroundImage = `url(${e.target.result})`;
                    currentUploadTarget.style.backgroundSize = 'cover';
                    currentUploadTarget.style.backgroundPosition = 'center';
                    currentUploadTarget.innerHTML = '';
                };
                reader.readAsDataURL(file);
            }
        }

        let puzzleImage = null;
        let puzzleState = [];

        function uploadPuzzleImage() {
            document.getElementById('puzzleImageUpload').click();
        }

        function handlePuzzleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    puzzleImage = e.target.result;
                    createImagePuzzle();
                };
                reader.readAsDataURL(file);
            }
        }

        function createImagePuzzle() {
            const pieces = document.querySelectorAll('.puzzle-piece');
            pieces.forEach((piece, index) => {
                if (puzzleImage) {
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    piece.style.backgroundImage = `url(${puzzleImage})`;
                    piece.style.backgroundSize = '400% 400%';
                    piece.style.backgroundPosition = `${col * 33.33}% ${row * 33.33}%`;
                    piece.textContent = '';
                }
            });
            shufflePuzzle();
        }

        function togglePiece(piece) {
            if (piece.style.opacity === '0.5') {
                piece.style.opacity = '1';
                piece.style.transform = 'scale(1)';
            } else {
                piece.style.opacity = '0.5';
                piece.style.transform = 'scale(0.8)';
            }
        }

        function shufflePuzzle() {
            const pieces = Array.from(document.querySelectorAll('.puzzle-piece'));
            const grid = document.getElementById('puzzleGrid');
            
            for (let i = pieces.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
            }

            pieces.forEach(piece => grid.appendChild(piece));
        }

        function resetPuzzle() {
            const pieces = document.querySelectorAll('.puzzle-piece');
            pieces.forEach(piece => {
                piece.style.opacity = '1';
                piece.style.transform = 'scale(1)';
            });
        }

        function generateShareLink() {
            const shareResult = document.getElementById('shareResult');
            const link = `${window.location.href}?shared=puzzle&code=${Math.random().toString(36).substr(2, 9)}`;
            shareResult.innerHTML = `
                <h3 style="color: #c44569; margin: 10px 0;">💝 Share Your Puzzle! 💝</h3>
                <div class="share-link">${link}</div>
                <p style="color: #666; margin-top: 10px;">Send this link to your loved one so they can solve your heart puzzle!</p>
            `;
        }


        document.addEventListener('click', function(e) {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.fontSize = '20px';
            heart.style.animation = 'heartFloat 2s ease-out forwards';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                document.body.removeChild(heart);
            }, 2000);
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes heartFloat {
                0% {
                    opacity: 1;
                    transform: translateY(0px) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100px) scale(1.5);
                }
            }
        `;

        document.head.appendChild(style);
