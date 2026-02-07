<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seguimiento_pedidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pedido_id')->constrained('pedidos')->onDelete('cascade');

            $table->string('estado', 50);
            $table->decimal('ubicacion_lat', 10, 8)->nullable();
            $table->decimal('ubicacion_lng', 11, 8)->nullable();
            $table->text('observaciones')->nullable();

            $table->timestamp('fecha_evento')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seguimiento_pedidos');
    }
};
