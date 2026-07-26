/* -----------------------
   GLOBAL
----------------------- */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

html{
    scroll-behavior:smooth;
}

body{

    background:#090909;
    color:white;

    font-family:Inter,sans-serif;

    overflow-x:hidden;

}

/* -----------------------
   Background Grid
----------------------- */

body::before{

    content:"";

    position:fixed;

    inset:0;

    background-image:

    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),

    linear-gradient(90deg,
    rgba(255,255,255,.05) 1px,
    transparent 1px);

    background-size:60px 60px;

    z-index:-10;

}

/* -----------------------
   Cursor
----------------------- */

.cursor{

    width:25px;
    height:25px;

    position:fixed;

    border-radius:50%;

    background:white;

    mix-blend-mode:difference;

    pointer-events:none;

    transform:translate(-50%,-50%);

    transition:
    transform .08s linear;

    z-index:1000;

}

/* -----------------------
   Animated Blobs
----------------------- */

.blob{

    position:fixed;

    width:450px;
    height:450px;

    border-radius:50%;

    filter:blur(120px);

    opacity:.35;

    z-index:-2;

}

.blob1{

    background:#7c3aed;

    top:-120px;
    left:-120px;

    animation:blob1 14s infinite alternate ease-in-out;

}

.blob2{

    background:#06b6d4;

    bottom:-150px;
    right:-150px;

    animation:blob2 18s infinite alternate ease-in-out;

}

.blob3{

    background:#ec4899;

    top:40%;

    left:45%;

    animation:blob3 16s infinite alternate ease-in-out;

}

/* -----------------------
   Hero
----------------------- */

.hero{

    height:100vh;

    display:flex;

    flex-direction:column;

    justify-content:center;

    align-items:center;

    text-align:center;

    padding:30px;

}

.title{

    font-size:clamp(4rem,11vw,8rem);

    font-weight:900;

    letter-spacing:-4px;

}

.subtitle{

    color:#b8b8b8;

    max-width:700px;

    margin-top:25px;

    font-size:1.25rem;

    line-height:1.7;

}

.explore{

    margin-top:55px;

    padding:18px 42px;

    border-radius:50px;

    background:white;

    color:black;

    text-decoration:none;

    font-weight:700;

    transition:.3s;

}

.explore:hover{

    transform:translateY(-5px);

    box-shadow:0 20px 45px rgba(255,255,255,.25);

}

/* -----------------------
   Projects
----------------------- */

section{

    max-width:1300px;

    margin:auto;

    padding:100px 30px;

}

section h2{

    font-size:3rem;

    margin-bottom:50px;

}

.cards{

    display:grid;

    grid-template-columns:

    repeat(auto-fit,minmax(280px,1fr));

    gap:30px;

}

/* -----------------------
   Card
----------------------- */

.card{

    position:relative;

    overflow:hidden;

    min-height:280px;

    border-radius:28px;

    text-decoration:none;

    color:white;

    padding:35px;

    backdrop-filter:blur(16px);

    border:1px solid rgba(255,255,255,.12);

    transition:.35s;

    transform-style:preserve-3d;

}

.card:hover{

    transform:
    translateY(-12px)
    scale(1.03);

}

.card::before{

    content:"";

    position:absolute;

    inset:0;

    background:

    linear-gradient(

    rgba(255,255,255,.15),

    transparent);

    opacity:0;

    transition:.4s;

}

.card:hover::before{

    opacity:1;

}

.emoji{

    font-size:3rem;

}

.card h3{

    margin-top:18px;

    font-size:2rem;

}

.card p{

    margin-top:15px;

    color:rgba(255,255,255,.9);

    line-height:1.7;

}

.launch{

    position:absolute;

    bottom:35px;

    font-weight:700;

}

/* -----------------------
   Gradients
----------------------- */

.purple{

    background:

    linear-gradient(

    135deg,

    #7c3aed,

    #4f46e5);

}

.pink{

    background:

    linear-gradient(

    135deg,

    #ec4899,

    #fb7185);

}

.blue{

    background:

    linear-gradient(

    135deg,

    #06b6d4,

    #2563eb);

}

.orange{

    color:#111;

    background:

    linear-gradient(

    135deg,

    #f97316,

    #facc15);

}

.green{

    background:

    linear-gradient(

    135deg,

    #22c55e,

    #15803d);

}

/* -----------------------
   Footer
----------------------- */

footer{

    text-align:center;

    padding:70px;

    color:#8b8b8b;

}

/* -----------------------
   Animations
----------------------- */

@keyframes blob1{

    from{

        transform:
        translate(0,0)
        scale(1);

    }

    to{

        transform:
        translate(160px,80px)
        scale(1.25);

    }

}

@keyframes blob2{

    from{

        transform:
        translate(0,0);

    }

    to{

        transform:
        translate(-180px,-120px);

    }

}

@keyframes blob3{

    from{

        transform:
        translate(0,0)
        scale(1);

    }

    to{

        transform:
        translate(100px,-80px)
        scale(1.35);

    }

}

/* -----------------------
   Responsive
----------------------- */

@media(max-width:900px){

.title{

font-size:4rem;

}

.subtitle{

font-size:1rem;

}

section{

padding:70px 20px;

}

.cards{

grid-template-columns:1fr;

}

.card{

min-height:240px;

}

}
