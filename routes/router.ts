import { type Route, type RouteParams } from './types';

export class Router {
  routes: Array<[string, Route]> = [];
  constructor (description: Record<string, string>) {
    for (const [screen, pattern] of Object.entries(description)) {
      this.routes.push([screen, createRoute(pattern)])
    }
  }

  matchPath (path: string): [string, RouteParams | undefined] {
    let name = 'NotFound';
    let params: RouteParams | undefined;

    for (const [screenName, route] of this.routes) {
      const res = route.match(path);

      if (res != null) {
        name = screenName;
        params = res.params;
        break;
      }
    }

    return [name, params];
  }
}

const createRoute = (pattern: string): Route => {
  const segments = pattern.split('/');
  const keys: string[] = [];

  // Convert the segments into a regular expression pattern
  const regexPattern = segments
    .map((segment) => {
      if (segment.startsWith(':')) {
        // If the segment starts with ':', it's a parameter
        keys.push(segment.substr(1)); // Add the parameter key to keys array
        return '([^/]+)'; // Match any characters except '/'
      } else {
        return segment; // Otherwise, keep the segment as is
      }
    })
    .join('/');

  const regex = new RegExp(`^${regexPattern}$`);

  return {
    match: (path: string) => {
      const match = path.match(regex);
      if (match == null) {
        return;
      }

      // Extract route parameters from the matched segments
      const params: Record<string, string> = {};
      keys.forEach((key, index) => {
        params[key] = match[index + 1]; // Matched groups start from index 1
      });

      return {
        params
      };
    }
  };
}
