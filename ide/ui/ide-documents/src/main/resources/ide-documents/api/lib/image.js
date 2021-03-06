/*
 * Copyright (c) 2010-2021 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-FileCopyrightText: 2010-2021 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 * SPDX-License-Identifier: EPL-2.0
 */
var streams = require('io/v4/streams');
var imageIO = require('io/v4/image');
var documentLib = require("ide-documents/api/lib/document");
 
 
exports.uploadImageWithResize = function(folder, name, image, width, height) {
	
    var fileName = name;
    var mimetype = image.getContentType();
    var originalInputStream = image.getInputStream();
    var inputStream = new streams.InputStream();
    inputStream.uuid = originalInputStream.uuid;
               
    var imageType = mimetype.split('/')[1];
    
    var resizedInputStream = imageIO.resize(inputStream, imageType, width, height);
    
    image.getInputStream = function(){
    	return resizedInputStream;//new streams.InputStream(fis);
    }
    
    documentLib.uploadDocument(folder, image);
}
