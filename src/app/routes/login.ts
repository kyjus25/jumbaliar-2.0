import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="flex h-screen border-t-8 border-primary">
        <div class="bg-secondary flex-1 flex items-center justify-center">
            <div>
                <h1 class="text-6xl mb-3">Welcome</h1>
                <p class="text-white/60 mb-3">Sign in to start using JumbaLiar</p>
                <span class="text-white/60">If you do not currently have an account, register </span>
                <!-- <ButtonModal btnClasses="text-primary cursor-pointer hover:opacity-80" btnText="here" index="1" title="Create Account">
                    <div class="flex mb-3 gap-3">
                        <input name="firstName" type="text" placeholder="First Name" class="input input-secondary flex-1" />
                        <input name="lastName" type="text" placeholder="Last Name" class="input input-secondary flex-1" />
                    </div>
                    <input name="username" type="text" placeholder="Username" class="input input-secondary w-full mb-3" />
                    <span class="text-black/50">This application uses <code class="bg-primary text-white/80 rounded px-1">-simple</code> passwords.</span>
                </ButtonModal> -->
            </div>
        </div>
        <div class="bg-[url('/shrimp.jpg')] flex-1 flex items-center justify-center relative">
            <div class="absolute top-0 left-0 w-full h-full bg-secondary/50"></div>
            <form id="login" class="relative">
                <input name="username" type="text" placeholder="Username" class="input w-full mb-3" />
                <input name="password" type="text" placeholder="Password" class="input w-full mb-3" /><br>
                <button type="submit" class="btn btn-primary">Sign In</button>
            </form>
        </div>
    </div>
  `,
  styles: [],
})
export default class SwaggerUiComponent {}
