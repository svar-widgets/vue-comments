import BasicInit from "./cases/BasicInit.vue";
import MarkdownInit from "./cases/MarkdownInit.vue";
import CustomContent from "./cases/CustomContent.vue";
import Events from "./cases/Events.vue";
import Locale from "./cases/Locale.vue";
import BackendUrl from "./cases/BackendUrl.vue";
import CustomBackend from "./cases/CustomBackend.vue";
import BackendResolve from "./cases/BackendResolve.vue";

export const links = [
	["/base/:skin", "Comments basic", BasicInit, "BasicInit"],
	["/markdown/:skin", "Markdown content", MarkdownInit, "MarkdownInit"],
	["/custom-render/:skin", "Custom content", CustomContent, "CustomContent"],
	["/events/:skin", "Events", Events, "Events"],
	["/locale/:skin", "Locales", Locale, "Locale"],
	["/backend-url/:skin", "Save to backend", BackendUrl, "BackendUrl"],
	["/backend-custom/:skin", "Custom backend", CustomBackend, "CustomBackend"],
	[
		"/data-resolve/:skin",
		"Resolve and fetch",
		BackendResolve,
		"BackendResolve",
	],
];
