from wagtail import hooks


# Add custom CSS/JS to admin if needed
@hooks.register('insert_global_admin_css')
def global_admin_css():
    return """
    <style>
        .snippet-chooser-panel .help {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }
        
        .content-snippets-group {
            border-left: 4px solid #007cad;
            padding-left: 10px;
        }
    </style>
    """


@hooks.register('insert_global_admin_js')
def global_admin_js():
    return """
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Add any custom JavaScript for admin interface here
            console.log('Core content snippets loaded');
        });
    </script>
    """