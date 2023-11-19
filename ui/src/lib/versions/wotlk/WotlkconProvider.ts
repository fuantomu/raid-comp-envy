import { LiveIconProvider } from '$lib/versions/live/LiveIconProvider';

export class WotlkIconProvider extends LiveIconProvider {
	getVersionIcon(size?: string) {
		return this.getSrc('expansionicon_wrathofthelichking', size);
	}
}
