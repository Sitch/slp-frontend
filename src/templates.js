define(function (require) {
	'use strict';

	return {
		// 404
		'PathNotFound': require('hbars!PathNotFound'),

		// Navigation
		'Navigation': require('hbars!Navigation'),

		// Footer
		'Footer': require('hbars!Footer'),

		// Section.Browse
		'Browse': require('hbars!Browse'),
		'BrowseLoading': require('hbars!BrowseLoading'),
		'Sidebar': require('hbars!Sidebar'),
		'SidebarAccount': require('hbars!SidebarAccount'),
		
		// Section.Priorities
		'Priorities': require('hbars!Priorities'),
		'EmptyTaskGroup': require('hbars!EmptyTaskGroup'),
		'TaskGroup': require('hbars!TaskGroup'),
		'Task': require('hbars!Task'),
		'TasksLoading': require('hbars!TasksLoading'),
		
		// Section.Task
		'TaskLayout': require('hbars!TaskLayout'),
		'Related': require('hbars!Related'),
		'RelatedEntity': require('hbars!RelatedEntity'),
		'TaskEntities': require('hbars!TaskEntities'),
		'TaskLoading': require('hbars!TaskLoading'),
		
		'Attachment': require('hbars!Attachment'),
		'Contact': require('hbars!Contact'),
		'Email': require('hbars!Email'),
		'Entity': require('hbars!Entity'),
		'Evernote': require('hbars!Evernote')
	};
});