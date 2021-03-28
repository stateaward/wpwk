<template>
   <div class="loading-wrapper">
      <div class="loading-outer-outer">
         <div class="loading-inner">
            <div>
               <div>
                  <div></div>
                  <div></div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
export default {};
</script>

<style>
.loading-wrapper {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   margin-top: 30%;
}

.loading-inner > div {
   transform: scale(0.22);
   transform-origin: 188.5px 188.5px;
}

.loading-inner > div > div {
   animation: loading-inner 2s linear infinite;
   position: absolute;
}

.loading-inner > div > div div:nth-child(1) {
   width: 135.72px;
   height: 135.72px;
   border-radius: 50%;
   border: 22.62px solid #f4b740;
   background: #ffffff;
}

.loading-inner > div > div div:nth-child(2) {
   width: 32.045px;
   height: 96.135px;
   transform: rotate(-45deg);
   background: #f4b740;
   border-radius: 0 0 15.08px 15.08px;
   position: absolute;
   top: 128.18px;
   left: 160.225px;
}
.loading-outer-outer {
   width: 377px;
   height: 377px;
   display: inline-block;
   overflow: hidden;
   background: none;
}
.loading-inner {
   width: 100%;
   height: 100%;
   position: relative;
   transform: translateZ(0) scale(1);
   backface-visibility: hidden;
   transform-origin: 0 0; /* see note above */
}

.loading-inner div {
   box-sizing: content-box;
}

@keyframes loading-inner {
   0% {
      transform: translate(3.77px, 3.77px);
   }
   33.33% {
      transform: translate(192.27px, 3.77px);
   }
   66.66% {
      transform: translate(79.17px, 192.27px);
   }
   100% {
      transform: translate(3.77px, 3.77px);
   }
}
</style>
