import {aboutMe} from "../projects.ts";

export function createFooter(): string {
	return `
		<footer class="text-center mt-16 pt-8 border-t border-ctp-surface1/30">
		    <div class="relative max-w-9/10 mx-auto">
		        <div class="absolute left-0 top-1/2 -translate-y-1/2 text-left">
		            <div class="flex items-center space-x-1 text-sm">
		                <a href="https://ctp-webr.ing/junya/previous" class="text-ctp-subtext0 hover:text-ctp-mauve transition-colors">&larr;</a>
		                <a href="https://ctp-webr.ing/" class="flex items-center text-ctp-subtext0 hover:text-ctp-mauve transition-colors"><img src="/catppuccin.png" alt="Catppuccin" class="h-4 max-h-4 w-auto object-contain mr-1"/><span> webring</span></a>
		                <a href="https://ctp-webr.ing/junya/next" class="text-ctp-subtext0 hover:text-ctp-mauve transition-colors">&rarr;</a>
		            </div>
		        </div>
				<div class="absolute right-0 top-1/2 -translate-y-1/2 text-right">
					<a href="https://webring.phthallo.com/member/5" target="_blank" rel="noopener noreferrer" class="text-ctp-subtext0 hover:text-ctp-mauve transition-colors">
						<iframe 
							src="https://webring.phthallo.com/api/widgets/5?format=text&style=font-family:'SFPro',system-ui,sans-serif;color:%23cdd6f4;font-size:0.875rem;" 
							frameborder="0" 
							scrolling="no" 
							height="48"
							loading="lazy"
							class="overflow-hidden"
						></iframe>
					</a>
				</div>
		        <p class="text-ctp-subtext0">
		            Made with ❤️ by 
		            <a href="https://github.com/${aboutMe.githubUsername}" target="_blank" rel="noopener noreferrer" class="text-ctp-mauve hover:text-ctp-pink transition-colors duration-200 font-medium">
		                junya
		            </a>
		        </p>
		    </div>
		</footer>
	`
}
