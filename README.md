# jQuery StackFlair Plugin

A jQuery plugin that displays StackExchange flair.

## Usage

To add flair for StackOverflow user ID 1 inside an element with ID `content`:

```javascript
$('#content').stackflair({ userId: 1 });
```

## Configuration

The default options are:

```javascript
$('#content').stackflair({
  site: 'stackoverflow.com',
  userId: 1,
  classPrefix: 'jquery-stackflair-'
});
```

### site
Specifies which StackExchange site the flair should come from. For instance, `stackoverflow.com` or `superuser.com`.

### userId
Specifies the user ID of the StackExchange user. Note that user IDs are unique to each StackExchange site (e.g., user 1 on StackOverflow is not necessarily the same person as user 1 on SuperUser).

### classPrefix
Allows override of the CSS class prefix used by the plugin.

## Known Issues

Currently does not play nice when there are multiple instances of flair on a page.